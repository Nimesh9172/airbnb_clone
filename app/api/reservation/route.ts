import prisma from "@/libs/prismadb";
import getCurrentUser from "@/app/actions/getCurrentUser";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const currentUser = await getCurrentUser();

  if (!currentUser) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  try {
    const body = await request.json();
    const jsonBody = JSON.parse(body);
    const { listingId, startDate, endDate, totalPrice } = jsonBody;

    if (!listingId || !startDate || !endDate || !totalPrice) {
      return NextResponse.json(
        { error: "Some Fields are missing" },
        { status: 400 }
      );
    }

    const listingAndReservation = await prisma.listing.update({
      where: {
        id: listingId,
      },
      data: {
        reservations: {
          create: {
            userId: currentUser.id,
            startDate,
            endDate,
            totalPrice,
          },
        },
      },
    });

    return NextResponse.json(listingAndReservation);
  } catch (error: any) {
    console.log(error);
    return NextResponse.json(
      { error: "Something went wrong" },
      { status: 400 }
    );
  }
}
