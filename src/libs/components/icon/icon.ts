import type { ExtractPropTypes } from "vue";

export const iconProps = {
    name: {
        required: true,
        type: String
    },
    size: {
        required: false,
        type: [String, Number],
        validator: (val: unknown): boolean => {
            if(typeof val !== 'string' && typeof val !== 'number') return false;
            else if(typeof val === 'string') {
                return ['small', 'medium', 'large'].includes(val);
            } else return true;
        }
    },
    color: {
        required: false,
        type: String
    }
};

export type IconProps = ExtractPropTypes<typeof iconProps>;