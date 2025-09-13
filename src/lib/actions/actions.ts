"use server"
import { prisma } from "../prisma";

export interface ActionMeal {
  code: string
  meal: string,
  category: string,
  thumb: string
}

export async function saveMeal(userId: string, meal: ActionMeal) {
  try {
    if (!meal)
      return { success: false, message: "Something went wrong." };

    const saved = await prisma.save.create({
      data: {
        meal: meal.meal,
        code: meal.code,
        category: meal.category,
        thumb: meal.thumb,
        user: { connect: { id: userId } }
      },
      select: {
        id: true,
      }
    })

    if(!saved) 
      return { success: false, message: "Meal can't be saved. try again." };

    return {
      success: true,
      meal: (saved.id ? meal : {})
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
      id: saved
    }
  } catch (err) {
    console.log(err);
    return {
      success: false,
      message: "Something went wrong.",
    };
  }
}

