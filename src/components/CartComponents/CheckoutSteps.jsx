const STEPS = [
    { id: 1, step: 'Cart' },
    { id: 2, step: 'Checkout' },
];

const CheckoutSteps = ({step}) => {

    return (
        <div className='my-5'>
            <div className='flex items-center justify-center'>
                {STEPS.map((item, index) => (
                    [
                        <div key={`step-${item.id}`} className={`w-9 h-9 rounded-full flex items-center justify-center border ${(step === item.id || item.id === 1) ? 'bg-primary border-primary text-white' : 'bg-white border-[#dedede]'}`}>
                            <span className='text-sm'>{item.id}</span>
                        </div>,
                        index < STEPS.length - 1 && (
                            <div key={`line-${item.id}`} className={`h-[1.5px] w-24 ${step > item.id ? 'bg-primary' : 'bg-[#dedede]'}`}></div>
                        )
                    ]
                ))}
            </div>
            <div className='flex items-center justify-center mt-1'>
                {STEPS.map((item, index) => (
                    [
                        <div key={`label-${item.id}`} className='w-9 flex justify-center'>
                            <span className={`whitespace-nowrap text-sm ${(step === item.id || item.id === 1) ? 'font-medium text-primary' : ''}`}>{item.step}</span>
                        </div>,
                        index < STEPS.length - 1 && (
                            <div key={`spacer-${item.id}`} className='w-24'></div>
                        )
                    ]
                ))}
            </div>
        </div>
    );
};

export default CheckoutSteps;