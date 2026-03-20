import { useEffect, useRef } from 'react'

type UnavailableDialogProps = {
    isOpen: boolean
    onClose: () => void
}

export function UnavailableDialog({ isOpen, onClose }: UnavailableDialogProps) {
    const dialogRef = useRef<HTMLDialogElement | null>(null)

    useEffect(() => {
        const dialog = dialogRef.current

        if (!dialog) {
            return
        }

        if (isOpen) {
            if (!dialog.open) {
                dialog.showModal()
            }

            return
        }

        if (dialog.open) {
            dialog.close()
        }
    }, [isOpen])

    return (
        <dialog
            ref={dialogRef}
            onClose={onClose}
            style={{ borderRadius: '8px', border: '2px solid #ccc', padding: '1rem', gap: '0.25rem' }}
        >
            <div>
                <h2>Error</h2>
                <p>This function is not functional.</p>
                <button type="button" onClick={onClose}>
                    Close
                </button>
            </div>
        </dialog>
    )
}