import { definePropType, iconPropType } from 'utils';
import type { ObjectFitProperty } from 'csstype';
import type { ExtractPropTypes } from 'vue';
import Avatar from './avatar.vue';

export const avatarProps = {
    size: {
        type: [Number, String],
        default: 'default',
        validator: (val: unknown): boolean => {
            if(typeof val === 'number') return true;
            else if(typeof val === 'string') {
                return ['large', 'default', 'small'].includes(val);
            } else return false;
        }
    },
    shape: {
        type: String,
        default: 'circle',
        validator: (val: any): val is string => ['circle', 'square'].includes(val)
    },
    src: String,
    alt: String,
    icon: iconPropType,
    fit: {
        type: definePropType<ObjectFitProperty>(String),
        default: 'cover'
    }
};

export type AvatarProps = ExtractPropTypes<typeof avatarProps>;

export const avatarEmits = {
    error: (e: Event) => e instanceof Event
};

export type AvatarEmits = typeof avatarEmits;
export type AvatarInstance = InstanceType<typeof Avatar>;
