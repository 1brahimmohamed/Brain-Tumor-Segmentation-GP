export const detectCineHeight = (value: number) => {
    switch (value) {
        case 1:
            return ['h-[95%]', 'h-[5%]'];
        case 3:
            return ['h-[90%]', 'h-[10%]'];
        case 4:
            return ['h-[88%]', 'h-[12%]'];
        case 2:
        default:
            return ['h-[92%]', 'h-[8%]'];
    }
};
