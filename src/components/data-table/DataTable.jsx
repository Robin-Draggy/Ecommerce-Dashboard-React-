import React, {
  useState,
  useMemo,
  useCallback,
  useDeferredValue,
  memo,
} from "react";
import {
  ChevronUp,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  Search,
  ListFilterPlus,
} from "lucide-react";
import { useDebounce } from "../../hooks/useDebounce";

// =====================
// Row Component
// =====================
const TableRow = memo(({ row, columns }) => (
  <tr className="hover:bg-sidebar-cl/50 transition-colors">
    {columns.map((col) => (
      <td key={col.key} className="px-4 py-2 text-cl-primary">
        {col.render ? col.render(row) : (row[col.key] ?? "—")}
      </td>
    ))}
  </tr>
));
TableRow.displayName = "TableRow";

// =====================
// Skeleton Row
// =====================
const SkeletonRow = ({ columns }) => (
  <tr>
    {columns.map((col) => (
      <td key={col.key} className="px-4 py-3">
        <div className="h-4 w-full bg-gray-200 rounded animate-pulse" />
      </td>
    ))}
  </tr>
);

// =====================
// Main Table
// =====================
export const DataTable = ({
  data = [],
  columns = [],
  loading = false,
  error = null,

  initialSortColumn = null,
  initialSortDirection = "asc",
  initialPageSize = 10,
  pageSizeOptions = [5, 10, 25, 50],
  debounceDelay = 300,

  onSortChange,
  onFilterChange,
  onPageChange,
  totalItems = null,
}) => {
  const [sortColumn, setSortColumn] = useState(initialSortColumn);
  const [sortDirection, setSortDirection] = useState(initialSortDirection);
  const [filterInput, setFilterInput] = useState("");
  const [pageIndex, setPageIndex] = useState(0);
  const [pageSize, setPageSize] = useState(initialPageSize);

  const debouncedFilter = useDebounce(filterInput, debounceDelay);

  const isExternallyControlled = {
    sort: !!onSortChange,
    filter: !!onFilterChange,
    page: !!onPageChange,
  };

  const currentSortColumn = sortColumn;
  const currentSortDirection = sortDirection;

  // =====================
  // Sorting
  // =====================
  const handleSort = useCallback(
    (columnKey) => {
      if (columnKey === sortColumn) {
        setSortDirection((prev) => (prev === "asc" ? "desc" : "asc"));
      } else {
        setSortColumn(columnKey);
        setSortDirection("asc");
      }
    },
    [sortColumn],
  );

  // =====================
  // Filtering
  // =====================
  const handleFilterChange = useCallback((value) => {
    setFilterInput(value);
    setPageIndex(0);
  }, []);

  // =====================
  // Data Processing
  // =====================
  const processedData = useMemo(() => {
    let result = [...data];

    // Filter
    if (debouncedFilter.trim()) {
      const filterLower = debouncedFilter.toLowerCase();
      result = result.filter((row) =>
        columns.some((col) => {
          const value = row[col.key];
          return value && String(value).toLowerCase().includes(filterLower);
        }),
      );
    }

    // Sort
    if (currentSortColumn) {
      result.sort((a, b) => {
        const aVal = a[currentSortColumn];
        const bVal = b[currentSortColumn];

        if (typeof aVal === "number" && typeof bVal === "number") {
          return currentSortDirection === "asc" ? aVal - bVal : bVal - aVal;
        }

        return currentSortDirection === "asc"
          ? String(aVal).localeCompare(String(bVal))
          : String(bVal).localeCompare(String(aVal));
      });
    }

    return result;
  }, [data, debouncedFilter, currentSortColumn, currentSortDirection, columns]);

  const totalRows = totalItems ?? processedData.length;
  const pageCount = Math.ceil(totalRows / pageSize);

  const paginatedData = useMemo(() => {
    const start = pageIndex * pageSize;
    return processedData.slice(start, start + pageSize);
  }, [processedData, pageIndex, pageSize]);

  const deferredData = useDeferredValue(paginatedData);

  // =====================
  // UI Helpers
  // =====================
  const renderSortIcon = (key) => {
    if (key !== sortColumn) return null;
    return sortDirection === "asc" ? (
      <ChevronUp size={14} />
    ) : (
      <ChevronDown size={14} />
    );
  };

  // =====================
  // RENDER
  // =====================
  return (
    <div className="space-y-4">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <ListFilterPlus size={20} />
          <div className="flex items-center gap-2 px-2 py-1 shadow rounded-lg">
            <Search size={14} />
            <input
              value={filterInput}
              onChange={(e) => handleFilterChange(e.target.value)}
              placeholder="Search..."
              className="bg-transparent outline-none"
            />
          </div>
        </div>

        <div className="text-sm">{totalRows} items</div>
      </div>

      {/* Table */}
      <div className="w-full overflow-x-auto rounded-lg border">
        <table className="w-full text-left text-sm">
          {/* HEAD */}
          <thead className="border-b bg-cl-primary">
            <tr>
              {columns.map((col) => (
                <th
                  key={col.key}
                  onClick={() => handleSort(col.key)}
                  className="px-4 py-3 cursor-pointer"
                >
                  <div className="flex items-center gap-1">
                    {col.label}
                    {renderSortIcon(col.key)}
                  </div>
                </th>
              ))}
            </tr>
          </thead>

          {/* BODY */}
          <tbody>
            {/* LOADING */}
            {loading &&
              Array.from({ length: 5 }).map((_, i) => (
                <SkeletonRow key={i} columns={columns} />
              ))}

            {/* ERROR */}
            {!loading && error && (
              <tr>
                <td
                  colSpan={columns.length}
                  className="text-center py-6 text-red-500"
                >
                  {error}
                </td>
              </tr>
            )}

            {/* EMPTY */}
            {!loading && !error && deferredData.length === 0 && (
              <tr>
                <td
                  colSpan={columns.length}
                  className="text-center py-6 text-gray-500"
                >
                  No data to display
                </td>
              </tr>
            )}

            {/* DATA */}
            {!loading &&
              !error &&
              deferredData.map((row, index) => (
                <TableRow key={row.id || index} row={row} columns={columns} />
              ))}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      {pageCount > 1 && (
        <div className="flex justify-between items-center">
          <select
            value={pageSize}
            onChange={(e) => {
              setPageSize(Number(e.target.value));
              setPageIndex(0);
            }}
            className="border px-2 py-1 rounded"
          >
            {pageSizeOptions.map((opt) => (
              <option key={opt} value={opt}>
                {opt}
              </option>
            ))}
          </select>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setPageIndex((p) => p - 1)}
              disabled={pageIndex === 0}
            >
              <ChevronLeft />
            </button>

            <span>
              {pageIndex + 1} / {pageCount}
            </span>

            <button
              onClick={() => setPageIndex((p) => p + 1)}
              disabled={pageIndex >= pageCount - 1}
            >
              <ChevronRight />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
