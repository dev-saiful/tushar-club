import { useState } from 'react'
import {
  useReactTable,
  getCoreRowModel,
  getSortedRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  flexRender,
  type ColumnDef,
  type SortingState,
} from '@tanstack/react-table'

interface DataTableProps<T> {
  columns: ColumnDef<T, unknown>[]
  data: T[]
  searchPlaceholder?: string
  pageSize?: number
  emptyMessage?: string
}

export default function DataTable<T>({
  columns,
  data,
  searchPlaceholder = 'খুঁজুন...',
  pageSize = 10,
  emptyMessage = 'কোনো তথ্য নেই',
}: DataTableProps<T>) {
  const [sorting, setSorting] = useState<SortingState>([])
  const [globalFilter, setGlobalFilter] = useState('')

  const table = useReactTable({
    columns,
    data,
    state: { sorting, globalFilter },
    onSortingChange: setSorting,
    onGlobalFilterChange: setGlobalFilter,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    initialState: { pagination: { pageSize } },
  })

  const rows = table.getRowModel().rows

  return (
    <div className="space-y-4">
      {/* Search */}
      <input
        type="text"
        placeholder={searchPlaceholder}
        value={globalFilter}
        onChange={(e) => setGlobalFilter(e.target.value)}
        className="w-full md:max-w-xs px-3 py-2 rounded-lg bg-gray-700 text-white text-sm border border-gray-600 focus:border-blue-500 focus:outline-none"
      />

      {/* Desktop table */}
      <div className="hidden md:block bg-gray-800 rounded-lg overflow-auto">
        <table className="w-full text-sm text-gray-200">
          <thead>
            {table.getHeaderGroups().map((hg) => (
              <tr key={hg.id} className="border-b border-gray-700 text-left">
                {hg.headers.map((h) => (
                  <th
                    key={h.id}
                    onClick={h.column.getToggleSortingHandler()}
                    className={`px-4 py-3 whitespace-nowrap ${h.column.getCanSort() ? 'cursor-pointer select-none hover:text-white' : ''}`}
                  >
                    {flexRender(h.column.columnDef.header, h.getContext())}
                    {h.column.getIsSorted() === 'asc' ? ' ↑' : h.column.getIsSorted() === 'desc' ? ' ↓' : ''}
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody>
            {rows.map((row) => (
              <tr key={row.id} className="border-b border-gray-700 hover:bg-gray-700/50">
                {row.getVisibleCells().map((cell) => (
                  <td key={cell.id} className="px-4 py-3">
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
        {rows.length === 0 && <p className="text-gray-400 p-4 text-center">{emptyMessage}</p>}
      </div>

      {/* Mobile cards */}
      <div className="md:hidden space-y-3">
        {rows.map((row) => (
          <div key={row.id} className="bg-gray-800 rounded-lg p-4 space-y-2 text-sm">
            {row.getVisibleCells().map((cell) => (
              <div key={cell.id} className="flex justify-between gap-3 text-gray-200">
                <span className="text-gray-400 shrink-0">
                  {typeof cell.column.columnDef.header === 'string'
                    ? cell.column.columnDef.header
                    : cell.column.id}
                </span>
                <span className="text-right">
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </span>
              </div>
            ))}
          </div>
        ))}
        {rows.length === 0 && <p className="text-gray-400 p-4 text-center">{emptyMessage}</p>}
      </div>

      {/* Pagination */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-3 text-sm text-gray-300">
        <span>
          মোট {table.getFilteredRowModel().rows.length}টির মধ্যে{' '}
          {table.getState().pagination.pageIndex * table.getState().pagination.pageSize + 1}-
          {Math.min(
            (table.getState().pagination.pageIndex + 1) * table.getState().pagination.pageSize,
            table.getFilteredRowModel().rows.length,
          )} দেখানো হচ্ছে
        </span>

        <div className="flex items-center gap-2">
          <select
            value={table.getState().pagination.pageSize}
            onChange={(e) => table.setPageSize(Number(e.target.value))}
            className="px-2 py-1 rounded bg-gray-700 text-white border border-gray-600"
          >
            {[5, 10, 20, 50].map((s) => (
              <option key={s} value={s}>{s} / পৃষ্ঠা</option>
            ))}
          </select>
          <button
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
            className="px-3 py-1 bg-gray-700 rounded text-white disabled:opacity-40"
          >
            ←
          </button>
          <span>
            {table.getState().pagination.pageIndex + 1} / {table.getPageCount() || 1}
          </span>
          <button
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
            className="px-3 py-1 bg-gray-700 rounded text-white disabled:opacity-40"
          >
            →
          </button>
        </div>
      </div>
    </div>
  )
}
