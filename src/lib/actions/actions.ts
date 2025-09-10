"use server"
import { prisma } from "../prisma";

export async function saveMeal(userId: string, mealCode: string, meal: string) {
  try {
    if (!userId  && !mealCode && !meal)
      return { success: false, message: "Something went wrong." };

    const saved = await prisma.save.create({
      data: {
        meal,
        code: mealCode,
        user: { connect: { id: userId } }
      },
      select: {
        id: true,
        meal: true,
        code: true,
      }
    })

    if(!saved) 
      return { success: false, message: "Meal can't be saved. try again." };

    return {
      success: true,
      saved
    }
  } catch (err) {
    console.log(err);
    return {
      success: false,
      message: "Something went wrong.",
    };
  }
}

export async function removeSaveMeal(mealId: string) {
  try {
    if(mealId === "")
      return { success: false, message: "Something went wrong.", };

    const saved = await prisma.save.delete({
      where: { id: mealId },
      select: {
        id: true
      }
    })

    if(!saved)
      return { success: false, message: "Saved meal can't be removed. try again." };

    return {
      success: true,
      saved
    }
  } catch (err) {
    console.log(err);
    return {
      success: false,
      message: "Something went wrong.",
    };
  }
}

