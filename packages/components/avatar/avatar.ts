import { buildProps, definePropType, iconPropType } from '@hyper/utils';
import type { ObjectFitProperty } from 'csstype';
import type { ExtractPropTypes } from 'vue';
import Avatar from './avatar.vue';

const SIZE_MAP = ['large', 'default', 'small'];
const SHAPE_MAP = ['circle', 'square'];

export const avatarProps = buildProps({
    size: {
        type: [Number, String],
        default: 'default',
        validator: (val: unknown): boolean => {
            if(typeof val === 'number') return true;
            else if(typeof val === 'string') {
                return SIZE_MAP.includes(val);
            } else return false;
        }
    },
    shape: {
        type: String,
        values: SHAPE_MAP,
        default: 'circle'
    },
    src: String,
    alt: String,
    icon: { type: iconPropType },
    fit: {
        type: definePropType<ObjectFitProperty>(String),
        default: 'cover'
    }
} as const);

export type AvatarProps = ExtractPropTypes<typeof avatarProps>;

export const avatarEmits = {
    error: (e: Event) => e instanceof Event
};

export type AvatarEmits = typeof avatarEmits;
export type AvatarInstance = InstanceType<typeof Avatar>;
