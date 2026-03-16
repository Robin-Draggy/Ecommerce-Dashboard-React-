import React, { useState, useMemo, useCallback, useDeferredValue, useEffect, memo } from 'react';
import { ChevronUp, ChevronDown, ChevronLeft, ChevronRight, Search, ListFilterPlus } from 'lucide-react';
import { useDebounce } from '../../hooks/useDebounce';



// Memoized row component to prevent re-rendering all rows on every small change
const TableRow = memo(({ row, columns }) => (
  <tr className="hover:bg-sidebar-cl/50 transition-colors">
    {columns.map((col) => (
      <td key={col.key} className="px-4 py-2 text-cl-primary">
        {col.render ? col.render(row, col.key) : row[col.key] ?? '—'}
      </td>
    ))}
  </tr>
));
TableRow.displayName = 'TableRow';

export const DataTable = ({
  data = [],
  columns = [],
  // Optional external control
  initialSortColumn = null,
  initialSortDirection = 'asc',
  initialPageSize = 10,
  pageSizeOptions = [5, 10, 25, 50],
  debounceDelay = 300, 
  onSortChange = null,
  onFilterChange = null,
  onPageChange = null,
  totalItems = null,
}) => {
  // Internal state
  const [sortColumn, setSortColumn] = useState(initialSortColumn);
  const [sortDirection, setSortDirection] = useState(initialSortDirection);
  const [filterInput, setFilterInput] = useState(''); // raw input for immediate feedback
  const [pageIndex, setPageIndex] = useState(0);
  const [pageSize, setPageSize] = useState(initialPageSize);

  // Debounced filter value – used for actual filtering
  const debouncedFilter = useDebounce(filterInput, debounceDelay);

  // Determine if externally controlled
  const isExternallyControlled = {
    sort: !!onSortChange,
    filter: !!onFilterChange,
    page: !!onPageChange,
  };

  // Current effective values
  const currentSortColumn = isExternallyControlled.sort ? initialSortColumn : sortColumn;
  const currentSortDirection = isExternallyControlled.sort ? initialSortDirection : sortDirection;
  const currentFilter = isExternallyControlled.filter ? filterInput : debouncedFilter; 
  const currentPageIndex = isExternallyControlled.page ? pageIndex : pageIndex;
  const currentPageSize = isExternallyControlled.page ? initialPageSize : pageSize;

  // Handlers (memoized)
  const handleSort = useCallback((columnKey) => {
    if (isExternallyControlled.sort) {
      const newDirection = columnKey === currentSortColumn && currentSortDirection === 'asc' ? 'desc' : 'asc';
      onSortChange(columnKey, newDirection);
    } else {
      setSortColumn((prevCol) => {
        if (columnKey === prevCol) {
          setSortDirection((prevDir) => (prevDir === 'asc' ? 'desc' : 'asc'));
          return prevCol;
        } else {
          setSortDirection('asc');
          return columnKey;
        }
      });
    }
  }, [isExternallyControlled.sort, onSortChange, currentSortColumn, currentSortDirection]);

  const handleFilterChange = useCallback((value) => {
    setFilterInput(value); 
    if (isExternallyControlled.filter) {
      // If externally controlled, we may want to debounce the callback as well.
      // We'll let the parent handle debouncing or implement it here.
      // For simplicity, we call onFilterChange after a delay (using useEffect on debouncedFilter)
    } else {
      setPageIndex(0); // reset page when filter changes internally
    }
  }, [isExternallyControlled.filter]);

  // For external filter, call onFilterChange when debouncedFilter changes
  useEffect(() => {
    if (isExternallyControlled.filter && onFilterChange) {
      onFilterChange(debouncedFilter);
    }
  }, [debouncedFilter, isExternallyControlled.filter, onFilterChange]);

  const handlePageChange = useCallback((newPageIndex) => {
    if (isExternallyControlled.page) {
      onPageChange(newPageIndex, currentPageSize);
    } else {
      setPageIndex(newPageIndex);
    }
  }, [isExternallyControlled.page, onPageChange, currentPageSize]);

  const handlePageSizeChange = useCallback((e) => {
    const newSize = Number(e.target.value);
    if (isExternallyControlled.page) {
      onPageChange(0, newSize);
    } else {
      setPageSize(newSize);
      setPageIndex(0);
    }
  }, [isExternallyControlled.page, onPageChange]);

  // --- Client-side processing (only if not externally controlled) ---
  const processedData = useMemo(() => {
    let result = [...data];

    // Filtering (using debouncedFilter)
    if (!isExternallyControlled.filter && debouncedFilter.trim() !== '') {
      const filterLower = debouncedFilter.toLowerCase();
      result = result.filter(row =>
        columns.some(col => {
          const value = row[col.key];
          if (value == null) return false;
          return String(value).toLowerCase().includes(filterLower);
        })
      );
    }

    // Sorting
    if (!isExternallyControlled.sort && currentSortColumn) {
      result.sort((a, b) => {
        const aVal = a[currentSortColumn];
        const bVal = b[currentSortColumn];
        if (aVal == null && bVal == null) return 0;
        if (aVal == null) return 1;
        if (bVal == null) return -1;

        if (typeof aVal === 'number' && typeof bVal === 'number') {
          return currentSortDirection === 'asc' ? aVal - bVal : bVal - aVal;
        }
        const aStr = String(aVal).toLowerCase();
        const bStr = String(bVal).toLowerCase();
        if (aStr < bStr) return currentSortDirection === 'asc' ? -1 : 1;
        if (aStr > bStr) return currentSortDirection === 'asc' ? 1 : -1;
        return 0;
      });
    }

    return result;
  }, [data, columns, debouncedFilter, currentSortColumn, currentSortDirection, isExternallyControlled]);

  // Total rows (client-side)
  const totalRows = isExternallyControlled.page ? totalItems : processedData.length;
  const pageCount = Math.ceil(totalRows / currentPageSize);

  // Paginated data
  const paginatedData = useMemo(() => {
    if (isExternallyControlled.page) {
      return data; // assume data is already paginated
    }
    const start = currentPageIndex * currentPageSize;
    return processedData.slice(start, start + currentPageSize);
  }, [processedData, currentPageIndex, currentPageSize, isExternallyControlled, data]);

  // Use deferred value for the paginated data to keep UI responsive during heavy renders
  const deferredPaginatedData = useDeferredValue(paginatedData);

  // Sort icon renderer
  const renderSortIcon = useCallback((colKey) => {
    if (colKey !== currentSortColumn) return null;
    return currentSortDirection === 'asc'
      ? <ChevronUp size={14} className="inline ml-1" />
      : <ChevronDown size={14} className="inline ml-1" />;
  }, [currentSortColumn, currentSortDirection]);

  if (!data.length && !deferredPaginatedData.length) {
    return (
      <div className="w-full rounded-lg border border-cl bg-cl-primary p-8 text-center text-cl-primary">
        No data to display
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {/* Global filter */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
            <ListFilterPlus size={20} />
        <div className="action text-cl-primary flex items-center gap-2 px-2 py-1 shadow rounded-lg">
          <Search size={14} />
          <input
            type="text"
            placeholder="Search..."
            value={filterInput}
            onChange={(e) => handleFilterChange(e.target.value)}
            className="focus:outline-none bg-transparent"
          />
        </div>
        </div>
        <div className="text-sm text-cl-muted action px-2 py-1 shadow rounded-lg">
          {totalRows} {totalRows === 1 ? 'item' : 'items'}
        </div>
      </div>

      {/* Table */}
      <div className="w-full overflow-x-auto rounded-lg border border-cl bg-cl-primary">
        <table className="w-full text-left text-sm">
          <thead className="border-b border-cl bg-sidebar-cl text-cl-primary">
            <tr>
              {columns.map((col) => (
                <th
                  key={col.key}
                  className="px-4 py-3 font-medium whitespace-nowrap cursor-pointer select-none hover:bg-sidebar-cl/70"
                  onClick={() => handleSort(col.key)}
                >
                  <span className="flex items-center gap-1">
                    {col.label}
                    {renderSortIcon(col.key)}
                  </span>
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-cl">
            {deferredPaginatedData.map((row, rowIndex) => (
              <TableRow
                key={row.id || rowIndex}
                row={row}
                columns={columns}
              />
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      {pageCount > 1 && (
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-sm text-cl-muted">Rows per page:</span>
            <select
              value={currentPageSize}
              onChange={handlePageSizeChange}
              className="px-2 py-1 rounded border border-cl bg-cl-primary text-cl-primary"
            >
              {pageSizeOptions.map(opt => (
                <option key={opt} value={opt}>{opt}</option>
              ))}
            </select>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={() => handlePageChange(currentPageIndex - 1)}
              disabled={currentPageIndex === 0}
              className="p-1 rounded hover:bg-sidebar-cl disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
            >
              <ChevronLeft size={18} />
            </button>
            <span className="text-sm text-cl-primary">
              Page {currentPageIndex + 1} of {pageCount}
            </span>
            <button
              onClick={() => handlePageChange(currentPageIndex + 1)}
              disabled={currentPageIndex >= pageCount - 1}
              className="p-1 rounded hover:bg-sidebar-cl disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
            >
              <ChevronRight size={18} />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};