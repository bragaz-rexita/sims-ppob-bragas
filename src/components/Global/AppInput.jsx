import { Input, Typography } from "antd";
import { useEffect, useState, useRef } from "react";

const { Text } = Typography;

const InputIDR = ({ name, value = 0, onChange, ...props }) => {
    const [displayValue, setDisplayValue] = useState("");

    const formatRupiah = (num) => {
        return new Intl.NumberFormat("id-ID").format(num);
    };

    const parseRupiah = (rupiahStr) => {
        return parseInt(rupiahStr.replace(/\./g, "")) || 0;
    };

    useEffect(() => {
        const num = typeof value === "string" ? parseRupiah(value) : value;
        setDisplayValue(formatRupiah(num));
    }, [value]);

    const handleChange = (e) => {
        const rawValue = e.target.value.replace(/[^0-9]/g, "");
        // const numValue = parseInt(rawValue) || 0;

        setDisplayValue(formatRupiah(rawValue));

        if (onChange) {
            // Kirim event object sintetis yang konsisten
            onChange({
                target: {
                    name: name,
                    value: rawValue // Nilai number tanpa format
                }
            });
        }
    };

    const handleFocus = (e) => {
        // Pilih semua teks saat fokus (opsional)
        e.target.select();
    };

    return (
        <Input
            {...props}
            name={name}
            value={displayValue}
            onChange={handleChange}
            onFocus={handleFocus}
            prefix={<Text style={{color:'gray'}}>Rp</Text>}
            style={{ textAlign: "left" }}
        />
    );
};

const InputIDRDisabled = ({ name, value = 0, onChange, ...props }) => {
    const [displayValue, setDisplayValue] = useState("");

    const formatRupiah = (num) => {
        // Bulatkan ke bilangan bulat (integer)
        const roundedNum = Math.round(parseFloat(num));
        
        return new Intl.NumberFormat("id-ID", {
            minimumFractionDigits: 0,
            maximumFractionDigits: 0
        }).format(roundedNum);
    };

    const parseRupiah = (rupiahStr) => {
        // Hapus semua titik (pemisah ribuan)
        return parseInt(rupiahStr.replace(/\./g, "")) || 0;
    };

    useEffect(() => {
        const num = typeof value === "string" ? parseRupiah(value) : value;
        setDisplayValue(formatRupiah(num));
    }, [value]);

    const handleChange = (e) => {
        const rawValue = e.target.value.replace(/[^0-9]/g, "");
        
        setDisplayValue(formatRupiah(rawValue));

        if (onChange) {
            onChange({
                target: {
                    name: name,
                    value: parseInt(rawValue) || 0 // Kirim sebagai integer
                }
            });
        }
    };

    return (
        <Input
            {...props}
            name={name}
            value={displayValue}
            onChange={handleChange}
            prefix={<Text style={{color:'gray'}}>Rp</Text>}
            style={{ textAlign: "left", color: '#000000' }}
            disabled
        />
    );
};

const InputNumber = ({ 
    name,
    value = 0,
    onChange,
    ...props
}) => {
    const [inputValue, setInputValue] = useState(
        value !== null && value !== undefined ? value.toString() : ''
    );

    useEffect(() => {
        const newValue = value !== null && value !== undefined ? value.toString() : '';
        setInputValue(newValue);
    }, [value]);

    const handleChange = (e) => {
        const rawValue = e.target.value;
        if (/^\d*$/.test(rawValue)) {
            setInputValue(rawValue);
            const numValue = rawValue === '' ? 0 : parseInt(rawValue, 10);
            
            // Kirim event object sintetis yang konsisten dengan handler biasa
            onChange?.({
                target: {
                    name: name,
                    value: numValue
                }
            });
        }
    };

    const handleFocus = (e) => {
        // Pilih semua teks saat fokus (opsional)
        e.target.select();
    };

    return (
        <Input
            {...props}
            name={name} // Teruskan name ke input
            value={inputValue}
            onChange={handleChange}
            onFocus={handleFocus}
            style={{ textAlign: 'left' }}
        />
    );
};

const InputNumberDisabled = ({ 
    name,
    value = 0,
    onChange,
    ...props
}) => {
    const [inputValue, setInputValue] = useState(value.toString());

    useEffect(() => {
        setInputValue(value.toString());
    }, [value]);

    const handleChange = (e) => {
        const rawValue = e.target.value;
        if (/^\d*$/.test(rawValue)) {
            setInputValue(rawValue);
            const numValue = rawValue === '' ? 0 : parseInt(rawValue, 10);
            
            // Kirim event object sintetis yang konsisten dengan handler biasa
            onChange?.({
                target: {
                    name: name,
                    value: numValue
                }
            });
        }
    };

    return (
        <Input
            {...props}
            name={name} // Teruskan name ke input
            value={inputValue}
            onChange={handleChange}
            style={{ textAlign: 'right', color:'#000000' }}
            disabled
        />
    );
};

const InputPhone = ({ 
    name,
    value = '',
    onChange,
    ...props
}) => {
    const [inputValue, setInputValue] = useState(
        value !== null && value !== undefined ? value.toString() : ''
    );

    useEffect(() => {
        const newValue = value !== null && value !== undefined ? value.toString() : '';
        setInputValue(newValue);
    }, [value]);

    const handleChange = (e) => {
        const rawValue = e.target.value;
        
        // Only allow numbers
        if (/^\d*$/.test(rawValue)) {
            setInputValue(rawValue);
            
            // Send synthetic event
            onChange?.({
                target: {
                    name: name,
                    value: rawValue
                }
            });
        }
    };

    return (
        <Input
            {...props}
            name={name}
            value={inputValue}
            onChange={handleChange}
            style={{ textAlign: 'left' }}
        />
    );
};

const InputKomisi = ({ 
    name,
    value = 0,
    onChange,
    allowDecimal = true,
    ...props
}) => {
    const [inputValue, setInputValue] = useState(value.toString().replace('.', ','));

    useEffect(() => {
        setInputValue(value.toString().replace('.', ','));
    }, [value]);

    const handleChange = (e) => {
        const rawValue = e.target.value;
        
        const regex = allowDecimal ? /^[0-9]*[,]?[0-9]*$/ : /^\d*$/;
        
        if (regex.test(rawValue)) {
            setInputValue(rawValue);
            
            let numValue;
            
            if (rawValue === '' || rawValue === ',') {
                numValue = 0;
            } else {
                const numericString = rawValue.replace(',', '.');
                numValue = allowDecimal ? parseFloat(numericString) : parseInt(numericString, 10);
                
                if (isNaN(numValue)) {
                    numValue = 0;
                }
            }
            
            onChange?.({
                target: {
                    name: name,
                    value: numValue
                }
            });
        }
    };

    return (
        <Input
            {...props}
            name={name}
            value={inputValue}
            onChange={handleChange}
            style={{ textAlign: 'right' }}
        />
    );
};

const InputPercent = ({ 
    name,
    value = 0,
    onChange,
    ...props
}) => {
    const [inputValue, setInputValue] = useState(
        value !== null && value !== undefined ? value.toString().replace('.', ',') : ''
    );

    useEffect(() => {
        const newValue = value !== null && value !== undefined ? value.toString().replace('.', ',') : '';
        setInputValue(newValue);
    }, [value]);

    const handleChange = (e) => {
        const rawValue = e.target.value;
        
        // Izinkan hanya angka dan satu koma desimal
        if (/^\d*,?\d*$/.test(rawValue)) {
            setInputValue(rawValue);
            
            // Konversi ke number dengan tetap menggunakan koma
            let numValue;
            if (rawValue === '' || rawValue === ',') {
                numValue = 0;
            } else {
                // Untuk perhitungan, ganti koma dengan titik
                const normalized = rawValue.replace(',', '.');
                numValue = parseFloat(normalized);
            }
            
            onChange?.({
                target: {
                    name: name,
                    value: isNaN(numValue) ? 0 : numValue
                }
            });
        }
    };

    const handleFocus = (e) => {
        // Pilih semua teks saat fokus (opsional)
        e.target.select();
    };

    return (
        <Input
            {...props}
            name={name}
            value={inputValue}
            onChange={handleChange}
            onFocus={handleFocus}
            style={{ textAlign: 'left' }}
            placeholder="0,0"
        />
    );
};

const InputIDRTwoDigits = ({ name, value = 0, onChange, ...props }) => {
    const [displayValue, setDisplayValue] = useState("");
    const cursorPosition = useRef(0);

    const formatRupiah = (num) => {
        const numberValue = typeof num === "string" ? 
            parseFloat(num.replace(/\./g, "").replace(",", ".")) : 
            Number(num);
        
        return new Intl.NumberFormat("id-ID", {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
            useGrouping: true
        }).format(isNaN(numberValue) ? 0 : numberValue);
    };

    const parseRupiah = (rupiahStr) => {
        if (!rupiahStr) return 0;
        const cleanStr = rupiahStr
            .replace(/\./g, "")
            .replace(/,/g, ".");
        return parseFloat(cleanStr) || 0;
    };

    useEffect(() => {
        if (value || value === 0) {
            const formatted = formatRupiah(value);
            setDisplayValue(formatted);
        }
    }, [value]);

    const handleChange = (e) => {
        const inputValue = e.target.value;
        
        // Simpan posisi kursor
        cursorPosition.current = e.target.selectionStart;
        
        // Hapus semua karakter kecuali angka
        let numbersOnly = inputValue.replace(/[^0-9]/g, "");
        
        // Jika kosong, set ke 0
        if (!numbersOnly) {
            numbersOnly = "0";
        }
        
        // Konversi ke number dan bagi dengan 100 untuk mendapatkan sen
        const numericValue = parseFloat(numbersOnly) / 100;
        
        // Format untuk display
        const formattedValue = formatRupiah(numericValue);
        setDisplayValue(formattedValue);

        // Kirim nilai
        if (onChange) {
            onChange({
                target: {
                    name: name,
                    value: numericValue.toString()
                }
            });
        }
        
        // Coba pertahankan posisi kursor setelah render ulang
        setTimeout(() => {
            const input = e.target;
            let newCursorPos = cursorPosition.current;
            
            // Sesuaikan posisi kursor berdasarkan perubahan format
            if (formattedValue.length > inputValue.length) {
                newCursorPos += (formattedValue.length - inputValue.length);
            }
            
            input.setSelectionRange(newCursorPos, newCursorPos);
        }, 0);
    };

    const handleFocus = (e) => {
        // Pilih semua teks saat fokus (opsional)
        e.target.select();
    };

    return (
        <Input
            {...props}
            name={name}
            value={displayValue}
            onChange={handleChange}
            onFocus={handleFocus}
            addonBefore="Rp"
            style={{ textAlign: "right" }}
            placeholder="0,00"
        />
    );
};

const InputIDRTwoDigitsDisabled = ({ name, value = 0, onChange, ...props }) => {
    const [displayValue, setDisplayValue] = useState("");
    const cursorPosition = useRef(0);

    const formatRupiah = (num) => {
        const numberValue = typeof num === "string" ? 
            parseFloat(num.replace(/\./g, "").replace(",", ".")) : 
            Number(num);
        
        return new Intl.NumberFormat("id-ID", {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
            useGrouping: true
        }).format(isNaN(numberValue) ? 0 : numberValue);
    };

    const parseRupiah = (rupiahStr) => {
        if (!rupiahStr) return 0;
        const cleanStr = rupiahStr
            .replace(/\./g, "")
            .replace(/,/g, ".");
        return parseFloat(cleanStr) || 0;
    };

    useEffect(() => {
        if (value || value === 0) {
            const formatted = formatRupiah(value);
            setDisplayValue(formatted);
        }
    }, [value]);

    const handleChange = (e) => {
        const inputValue = e.target.value;
        
        // Simpan posisi kursor
        cursorPosition.current = e.target.selectionStart;
        
        // Hapus semua karakter kecuali angka
        let numbersOnly = inputValue.replace(/[^0-9]/g, "");
        
        // Jika kosong, set ke 0
        if (!numbersOnly) {
            numbersOnly = "0";
        }
        
        // Konversi ke number dan bagi dengan 100 untuk mendapatkan sen
        const numericValue = parseFloat(numbersOnly) / 100;
        
        // Format untuk display
        const formattedValue = formatRupiah(numericValue);
        setDisplayValue(formattedValue);

        // Kirim nilai
        if (onChange) {
            onChange({
                target: {
                    name: name,
                    value: numericValue.toString()
                }
            });
        }
        
        // Coba pertahankan posisi kursor setelah render ulang
        setTimeout(() => {
            const input = e.target;
            let newCursorPos = cursorPosition.current;
            
            // Sesuaikan posisi kursor berdasarkan perubahan format
            if (formattedValue.length > inputValue.length) {
                newCursorPos += (formattedValue.length - inputValue.length);
            }
            
            input.setSelectionRange(newCursorPos, newCursorPos);
        }, 0);
    };

    const handleFocus = (e) => {
        // Pilih semua teks saat fokus (opsional)
        e.target.select();
    };

    return (
        <Input
            {...props}
            name={name}
            value={displayValue}
            onChange={handleChange}
            onFocus={handleFocus}
            // addonBefore="Rp"
            style={{ textAlign: "right", color: "#000000" }}
            placeholder="0,00"
            disabled
        />
    );
};

export {
    InputIDR,
    InputIDRDisabled,
    InputNumber,
    InputNumberDisabled,
    InputPhone,
    InputKomisi,
    InputPercent,
    InputIDRTwoDigits,
    InputIDRTwoDigitsDisabled,
};