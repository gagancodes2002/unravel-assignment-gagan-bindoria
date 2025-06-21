'use client'

export default function ({
    children,
    modal,
}: {
    children: React.ReactNode
    modal: React.ReactNode
}) {



    return (
        <div>
            {children}
            {modal}
        </div>
    )
}