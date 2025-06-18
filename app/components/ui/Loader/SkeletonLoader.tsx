export default function ({ length = 4 }: { length: number }) {
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-4">
            {Array.from({ length: length }).map((_, i) => (
                <div key={i} className="h-[200px] bg-gray-200 animate-pulse rounded" />
            ))}
        </div>
    )
}