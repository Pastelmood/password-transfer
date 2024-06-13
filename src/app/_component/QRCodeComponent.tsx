import QRCode from 'qrcode.react';

type QRCodeProps = {
    value: string;
    size?: number;
    level?: 'L' | 'M' | 'Q' | 'H';
}

export default function QRCodeComponent({ value, size = 128, level = 'M' }: QRCodeProps) {
    return (
        <div>
            <QRCode value={value} size={size} level={level} />
        </div>
    );
};
