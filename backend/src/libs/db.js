// import {PrismaClient} from "../generated/prisma/index.js";

// const globalForPrisma = globalThis;


// export const db = globalForPrisma.prisma || new PrismaClient();


// if(process.env.NODE_ENV !== "production") globalForPrisma.prisma = db


import {PrismaClient} from '@prisma/client'
export const db = new PrismaClient();