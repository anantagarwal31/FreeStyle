import { PrismaClient } from "@prisma/client";

console.log("Initializing PrismaClient...");
export const prismaClient = new PrismaClient();
console.log("PrismaClient initialized");