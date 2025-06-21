import { Box, Modal } from "@mui/material";
import { Room } from "../types";

export default function ({
    roomData,
    onClose,
}: {
    roomData: Room,
    onClose: () => void
}) {
    return (
        <Modal
            open={roomData !== null}
            onClose={onClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
        >
            <Box >
                CHECK
            </Box>
        </Modal>
    )
}