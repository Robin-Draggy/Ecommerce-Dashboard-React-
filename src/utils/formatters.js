/**
 * Format a number as USD currency
 */
export const formatCurrency = (amount) => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  }).format(amount);
};

/**
 * Format an ISO date string to a readable date (e.g., "Mar 1, 2024")
 */
export const formatDate = (dateString) => {
  if (!dateString) return '—';
  return new Date(dateString).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });
};

/**
 * Get Tailwind classes for a status badge based on status value.
 * You can extend this mapping as needed.
 */
export const getStatusBadge = (status) => {
  const baseClasses = 'px-2 py-1 rounded-full text-xs font-medium';
  switch (status?.toLowerCase()) {
    case 'delivered':
      return `${baseClasses} bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200`;
    case 'shipped':
      return `${baseClasses} bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200`;
    case 'processing':
      return `${baseClasses} bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200`;
    case 'cancelled':
      return `${baseClasses} bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200`;
    default:
      return `${baseClasses} bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-200`;
  }
};


export const getStockStatusBadge = (quantity, threshold) => {
  if (quantity === 0) return 'badge badge-danger';
  if (quantity < threshold) return 'badge badge-warning';
  return 'badge badge-success';
};