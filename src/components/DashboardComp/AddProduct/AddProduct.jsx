'use client'
import { useRef, useState } from "react";
import ProductCategorySelector from "./ProductCategorySelector";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import ProductStatusSelector from "./ProductStatusSelector";

const ACCEPTED_TYPES = ['image/jpeg', 'image/png', 'image/jpg'];
const MAX_SIZE_MB = 50;
const MAX_FILES = 10;

const AddProduct = () => {
    const [productCategory, setProductCategory] = useState(null)
    const [productStatus, setProductStatus] = useState(null)
    const [colors, setColors] = useState([]);
    const [isDragging, setIsDragging] = useState(false);
    const [inputValue, setInputValue] = useState('');
    const [error, setError] = useState('');
    const [files, setFiles] = useState([]);
    const {register, handleSubmit, reset} = useForm()
    const inputRef = useRef(null);
    const router = useRouter();

    const isValidHex = (value) => /^#([0-9A-Fa-f]{3}|[0-9A-Fa-f]{6})$/.test(value);
    
    const addColor = () => {
        const trimmed = inputValue.trim();
        if (!trimmed) return;

        // auto-prefix with # if user forgot it
        const normalized = trimmed.startsWith('#') ? trimmed : `#${trimmed}`;

        if (!isValidHex(normalized)) {
        setError('Enter a valid hex code, e.g. #FF6B00');
        return;
        }
        if (colors.some((c) => c.toLowerCase() === normalized.toLowerCase())) {
        setError('That color is already added');
        return;
        }

        setColors([...colors, normalized]);
        setInputValue('');
        setError('');
    };

    const removeColor = (index) => {
        setColors(colors.filter((_, i) => i !== index));
    };

    const handleKeyDown = (e) => {
        if (e.key === 'Enter') {
        e.preventDefault();
        addColor();
        } else if (e.key === 'Backspace' && inputValue === '' && colors.length > 0) {
        removeColor(colors.length - 1);
        }
    };

    const formatSize = (bytes) => {
        if (bytes < 1024 * 1024) return `${Math.round(bytes / 1024)} KB`;
        return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
    };

    const validateFile = (file, currentFiles) => {
        if (!ACCEPTED_TYPES.includes(file.type)) {
        return `"${file.name}" isn't a supported format. Use JPEG, PNG, JPG, PDF, or MP4.`;
        }
        if (file.size > MAX_SIZE_MB * 1024 * 1024) {
        return `"${file.name}" is too large. Max size is ${MAX_SIZE_MB} MB.`;
        }
        if (currentFiles.some((f) => f.name === file.name && f.size === file.size)) {
        return `"${file.name}" is already added.`;
        }
        return null;
    };

    const handleFiles = (fileList) => {
        const incoming = Array.from(fileList || []);
        if (incoming.length === 0) return;

        setFiles((prevFiles) => {
        let next = [...prevFiles];
        let firstError = '';

        for (const file of incoming) {
            if (next.length >= MAX_FILES) {
            firstError = firstError || `You can upload up to ${MAX_FILES} files.`;
            break;
            }
            const fileError = validateFile(file, next);
            if (fileError) {
            firstError = firstError || fileError;
            continue;
            }
            next = [...next, file];
        }

        setError(firstError);
        return next;
        });
    };

    const removeFile = (index) => {
        setFiles((prev) => prev.filter((_, i) => i !== index));
        setError('');
    };

    const handleDrop = (e) => {
        e.preventDefault();
        setIsDragging(false);
        handleFiles(e.dataTransfer.files);
    };

    const handleDragOver = (e) => {
        e.preventDefault();
        setIsDragging(true);
    };

    const handleDragLeave = (e) => {
        e.preventDefault();
        setIsDragging(false);
    };

    const onSubmit = async (data) => {
        if (productCategory === null || files.length === 0) {
            console.log('an input field is missing');
            return;
        }

        try {
            const uploadedPhotos = await Promise.all(
            files.map(async (file) => {
                const formData = new FormData();
                formData.append('file', file);
                formData.append('upload_preset', 'keebify');

                const uploadRes = await fetch(
                    `https://api.cloudinary.com/v1_1/db30o33kz/image/upload`,
                {
                    method: 'POST',
                    body: formData,
                }
                );

                if (!uploadRes.ok) {
                    throw new Error(`Failed to upload ${file.name}`);
                }

                const uploadData = await uploadRes.json();
                return uploadData.secure_url;
            })
            );

            const product = {
                name: data.name,
                price: data.price,
                category: productCategory,
                colors: colors,
                stock: data.stock,
                review: data.reviews,
                description: data.description,
                photos: uploadedPhotos,
            };

            const res = await fetch('http://localhost:3001/products', {
                method: 'POST',
                headers: {
                    'content-type': 'application/json',
                },
                body: JSON.stringify(product),
            });

            if (res.ok) {
                reset();
                router.push('/dashboard/products');
            } else {
                console.log('failed to save product');
            }
        } catch (err) {
            console.error('Upload or submit failed:', err);
        }
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)} className='mt-5 bg-border/50 rounded-xl px-4 py-5'>
            <div className='grid grid-cols-3 gap-5'>
                <div>
                    <label htmlFor="name" className='text-[#414141] block font-medium'>Product Name</label>
                    <input type="text" id='name' placeholder='Enter product name' className='mt-3 border border-[#c4c4c4]/50 rounded-lg py-2 px-3 text-[15px] focus:outline-0 w-full' {...register("name", {required: true})} />
                </div>
                <div>
                    <label htmlFor="price" className='text-[#414141] block font-medium'>Product Price</label>
                    <input type="number" id='price' placeholder='Enter product price' className='mt-3 border border-[#c4c4c4]/50 rounded-lg py-2 px-3 text-[15px] focus:outline-0 w-full' {...register("price", {required: true})} />
                </div>
                <div>
                    <label htmlFor="colorCodes" className='text-[#414141] block font-medium'>Product Colors</label>
                    <div id="colorCodes" className={`w-full flex flex-wrap items-center gap-2 border border-[#c4c4c4]/50 rounded-lg ${colors?.length === 0 ? 'py-2 px-3 ' : 'py-1 px-1.5'} mt-3`}>
                        {colors.map((color, index) => (
                            <span
                                key={color + index}
                                className="flex items-center gap-1.5 bg-white border border-border rounded-full pl-2 pr-1.5 py-1 text-[13px] text-[#1a1a1a]"
                            >
                                <span
                                className="w-3.5 h-3.5 rounded-full border border-black/10 shrink-0"
                                style={{ backgroundColor: color }}
                                />
                                {color}
                                <button
                                type="button"
                                onClick={() => removeColor(index)}
                                aria-label={`Remove ${color}`}
                                className="w-4 h-4 flex items-center justify-center rounded-full text-[#696969] hover:bg-secondary hover:text-[#1a1a1a] cursor-pointer"
                                >
                                ×
                                </button>
                            </span>
                        ))}
                        <input
                        type="text"
                        value={inputValue}
                        onChange={(e) => {
                            setInputValue(e.target.value);
                            if (error) setError('');
                        }}
                        onKeyDown={handleKeyDown}
                        placeholder={colors.length === 0 ? 'Enter your color codes' : ''}
                        className="flex-1 min-w-[100px] bg-transparent text-[15px] text-[#1a1a1a] placeholder:text-[#696969] focus:outline-none"
                        />
                    </div>
                </div>
            </div>
            <div className='grid grid-cols-4 gap-5 mt-5'>
                <div>
                    <label htmlFor="stock" className='text-[#414141] block font-medium'>Product Stock</label>
                    <input type="number" id='stock' placeholder='Enter product total stock' className='mt-3 border border-[#c4c4c4]/50 rounded-lg py-2 px-3 text-[15px] focus:outline-0 w-full' {...register("stock", {required: true})} />
                </div>
                <div>
                    <label htmlFor="review" className='text-[#414141] block font-medium'>Review Count</label>
                    <input type="number" id='review' placeholder='Enter product total reviews' className='mt-3 border border-[#c4c4c4]/50 rounded-lg py-2 px-3 text-[15px] focus:outline-0 w-full' {...register("reviews", {required: true})} />
                </div>
                <div>
                    <label htmlFor="category" className='text-[#414141] block font-medium'>Product Category</label>
                    <ProductCategorySelector setProductCategory={setProductCategory} />
                </div>
                <div>
                    <label htmlFor="category" className='text-[#414141] block font-medium'>Product Status</label>
                    <ProductStatusSelector setProductStatus={setProductStatus} />
                </div>
            </div>
            <div className='grid grid-cols-2 gap-5 mt-5'>
                <div>
                    <label htmlFor="description" className='text-[#414141] block font-medium'>Product Description</label>
                    <textarea type="number" id='description' rows={10} placeholder='Enter product total reviews' className='mt-3 border border-[#c4c4c4]/50 rounded-lg py-2 px-3 text-[15px] focus:outline-0 w-full' {...register("description", {required: true})} />
                </div>
                <div>
                    <label htmlFor="photo" className='text-[#414141] block font-medium'>Product Photo</label>
                    <div
                        onDrop={handleDrop}
                        onDragOver={handleDragOver}
                        onDragLeave={handleDragLeave}
                        className={`border border-dashed rounded-lg py-8.5 px-6 flex flex-col items-center justify-center text-center transition-colors mt-3 ${
                        isDragging ? 'border-[#696969] bg-[#e8e8e8]' : 'border-[#c9c9c9] bg-[#ececec]'
                        }`}
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="28" height="28" color="#414141" fill="none" stroke="#414141" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M17.4776 9.01106C17.485 9.01102 17.4925 9.01101 17.5 9.01101C19.9853 9.01101 22 11.0294 22 13.5193C22 15.8398 20.25 17.7508 18 18M17.4776 9.01106C17.4924 8.84606 17.5 8.67896 17.5 8.51009C17.5 5.46695 15.0376 3 12 3C9.12324 3 6.76233 5.21267 6.52042 8.03192M17.4776 9.01106C17.3753 10.1476 16.9286 11.1846 16.2428 12.0165M6.52042 8.03192C3.98398 8.27373 2 10.4139 2 13.0183C2 15.4417 3.71776 17.4632 6 17.9273M6.52042 8.03192C6.67826 8.01687 6.83823 8.00917 7 8.00917C8.12582 8.00917 9.16474 8.38194 10.0005 9.01101"></path>
                            <path d="M12 13L12 21M12 13C11.2998 13 9.99153 14.9943 9.5 15.5M12 13C12.7002 13 14.0085 14.9943 14.5 15.5"></path>
                        </svg>

                        <p className="text-lg font-medium text-[#1a1a1a] mt-5">Choose files or drag & drop them here.</p>

                        <p className="text-[15px] text-[#696969] mt-3 mb-5">JPEG, PNG and JPG formats, up to {MAX_SIZE_MB} MB each</p>

                        <button
                        type="button"
                        onClick={() => inputRef.current?.click()}
                        className="bg-white border border-[#c4c4c4]/75 rounded-xl px-4 py-2.5 text-[15px] font-medium text-[#1a1a1a] cursor-pointer hover:bg-[#fafafa]"
                        >
                            Browse Files
                        </button>

                        <input
                        ref={inputRef}
                        type="file"
                        multiple
                        accept=".jpeg,.jpg,.png,.pdf,.mp4"
                        onChange={(e) => {
                            handleFiles(e.target.files);
                            e.target.value = '';
                        }}
                        className="hidden"
                        />
                    </div>

                    {error && (
                        <p className="text-[13px] text-red-500 mt-2">{error}</p>
                    )}

                    {files.length > 0 && (
                        <div className="mt-3 space-y-2">
                        {files.map((file, index) => (
                            <div
                            key={file.name + file.size + index}
                            className="flex items-center gap-3 border border-border bg-secondary rounded-xl px-3 py-2.5"
                            >
                            {file.type.startsWith('image/') ? (
                                <img
                                src={URL.createObjectURL(file)}
                                alt=""
                                className="w-9 h-9 rounded-lg object-cover shrink-0"
                                />
                            ) : (
                                <div className="w-9 h-9 rounded-lg bg-white border border-border flex items-center justify-center shrink-0 text-[#696969] text-xs font-semibold">
                                {file.type === 'application/pdf' ? 'PDF' : 'MP4'}
                                </div>
                            )}
                            <div className="flex-1 min-w-0">
                                <p className="text-[14px] text-[#1a1a1a] truncate">{file.name}</p>
                                <p className="text-[12px] text-[#696969]">{formatSize(file.size)}</p>
                            </div>
                            <button
                                type="button"
                                onClick={() => removeFile(index)}
                                aria-label={`Remove ${file.name}`}
                                className="w-6 h-6 flex items-center justify-center rounded-full text-[#696969] hover:bg-white hover:text-[#1a1a1a] cursor-pointer shrink-0"
                            >
                                ×
                            </button>
                            </div>
                        ))}
                        </div>
                    )}
                </div>
            </div>
            <div>
                <button disabled={(productCategory === null || files.length === 0)} type="submit" className={`capitalize py-3 px-20 cursor-pointer rounded-xl mt-6 font-medium ${(productCategory === null || files.length === 0) ? 'bg-primary/80' : 'bg-primary text-white'}`}>Create Product</button>
            </div>
        </form>
    );
}; 

export default AddProduct;