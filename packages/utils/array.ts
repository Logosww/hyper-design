export const unique = <T>(arr: T[]) => [...new Set(arr)];

export const ensureArray = (arr: any): any[] => {
    if(!arr && arr !== 0) return [];
    return Array.isArray(arr) ? arr : [arr];
}