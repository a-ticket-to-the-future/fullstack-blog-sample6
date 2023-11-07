


import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";



//DB接続用の関数

const prisma = new PrismaClient();

export async function main() {
    try{
        await prisma.$connect();
    }catch(err){
        return Error("DB接続に失敗しました")
    }
}




//ブログの全記事取得用のAPI
export const GET = async (req:Request,res:NextResponse) => {
    try{
        const id:number = parseInt(req.url.split("/blog/")[1]);  //id:numberにするとidがエラーになるのでparseIntで整数変換する。そうすると整数認識されるのwhereの条件句にも入れることができる
        await main();
        const post = await prisma.post.findFirst({where:{id}}); //http://localhost:3000/api/blog/ここ
        return NextResponse.json({message:"Success",post},{status:200});
    }catch(err){
        return NextResponse.json({message:"Error",err},{status:500});
    }finally{
        await prisma.$disconnect();
    }
}




//ブログの編集用API
export const PUT = async (req:Request,res:NextResponse) => {
    try{
        const id:number = parseInt(req.url.split("/blog/")[1]);  //id:numberにするとidがエラーになるのでparseIntで整数変換する。そうすると整数認識されるのwhereの条件句にも入れることができる

        const {title,description,image} = await req.json();

        await main();
        const post = await prisma.post.update({
            data:{title,description,image},
            where:{id},
        }); //http://localhost:3000/api/blog/ここ
        return NextResponse.json({message:"Success",post},{status:200});
    }catch(err){
        return NextResponse.json({message:"Error",err},{status:500});
    }finally{
        await prisma.$disconnect();
    }
}




//ブログ削除用API
export const DELETE = async (req:Request,res:NextResponse) => {
    try{
        const id:number = parseInt(req.url.split("/blog/")[1]);  //id:numberにするとidがエラーになるのでparseIntで整数変換する。そうすると整数認識されるのwhereの条件句にも入れることができる


        await main();
        const post = await prisma.post.delete({
            
            where:{id},
        }); //http://localhost:3000/api/blog/ここ
        return NextResponse.json({message:"Success",post},{status:200});
    }catch(err){
        return NextResponse.json({message:"Error",err},{status:500});
    }finally{
        await prisma.$disconnect();
    }
}