import { Schema } from 'mongoose';
import * as globalStatics from '$models/global/global.statics'
import * as globalMethods from '$models/global/global.methods'

export default function setFunctions(schema: Schema, statics: any, methods: any) {
    Object.assign(schema.statics, statics, globalStatics);
    Object.assign(schema.methods, methods, globalMethods);
}
