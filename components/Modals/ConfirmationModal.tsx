import FilledButton from '@/components/Buttons/FilledButton';
import { Typography } from '@/constants/typography';
import clsx from 'clsx';
import TextButton from '../Buttons/TextButton';

export const ConfirmationModal = ({
    isOpen,
    onClose,
    onConfirm,
    title,
    message,
    confirmText = 'Excluir',
    cancelText = 'Cancelar'
}: {
    isOpen: boolean;
    onClose: () => void;
    onConfirm: () => void;
    title: string;
    message: string;
    confirmText?: string;
    cancelText?: string;
}) => {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg p-6 max-w-md w-full mx-4">
                <h2 className={clsx(Typography.Title, "mb-4")}>{title}</h2>
                <p className="mb-6">{message}</p>
                <div className="flex justify-end gap-3">
                    <TextButton
                        text={cancelText}
                        onClick={onClose}
                    >
                    </TextButton>
                    <FilledButton
                        text={confirmText}
                        onClick={onConfirm}
                        className="hover:bg-red-500"
                    />
                </div>
            </div>
        </div>
    );
};