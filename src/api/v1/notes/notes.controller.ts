import { NoteEntity } from '@entities';

class NotesController {
  public static list = (take = 20, skip = 0) =>
    NoteEntity.find({
      take,
      skip,
    });

  public static get = (id: number) => NoteEntity.findOneBy({ id });

  public static create = (item: Partial<NoteEntity>) =>
    NoteEntity.create(item).save();

  public static update = async (id: number, item: Partial<NoteEntity>) => {
    const record = await NotesController.get(id);

    if (!record) return null;

    await NoteEntity.update(id, item);

    await record.reload();

    return record;
  };

  public static delete = (id: string) => NoteEntity.delete(id);

  public static count = () => NoteEntity.count();
}

export default NotesController;
