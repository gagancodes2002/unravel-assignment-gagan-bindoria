export default function ({ error, errorMessage = "Unknown Error!" }: { error: Error, errorMessage?: string }) {

    return (
        <div className="text-red-500 text-center p-4">
            {error?.message || errorMessage}
            <p className="text-sm mt-1">{(error as Error).message}</p>
        </div>
    )
}