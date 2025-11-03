import { Button } from "@/components/ui/button"
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { useNotificationStore } from "@/shared/notifications/Notifications"

export function DialogCloseButton() {
    const notification = useNotificationStore((state) => state.create)
    const handleUpdate = useNotificationStore((state) => state.updateCount)


    return (
        <Dialog defaultOpen={notification} onOpenChange={handleUpdate}>
            <DialogTrigger asChild>
            </DialogTrigger>
            <DialogContent className="sm:max-w-md">
                <DialogHeader>
                    <DialogTitle>Se a creado su usuario con exito</DialogTitle>
                    <DialogDescription>
                        Creado con Exito
                    </DialogDescription>
                </DialogHeader>

                <DialogFooter className="sm:justify-start">
                    <DialogClose asChild>
                        <Button type="button" variant="secondary">
                            Close
                        </Button>
                    </DialogClose>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}
