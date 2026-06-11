import org from "./connection";

export async function deleteBins() {
  try {
    const binsWithNullUserId = await org.bin.findMany({
      where: { userId: null },
      select: { id: true },
    });

    const idsToDelete = binsWithNullUserId.map(bin => bin.id);

    if (idsToDelete.length === 0) {
      console.log('No bins found with null userId.');
      return { deletedCount: 0 };
    }

    const deleteResult = await org.bin.deleteMany({
      where: {
        id: {
          in: idsToDelete,
        },
      },
    });

    console.log(`Deleted ${deleteResult.count} bins with null userId.`);
    return { deletedCount: deleteResult.count };

  } catch (error) {
    console.error('Error deleting bins with null userId:', error);
    throw error;
  }
}
