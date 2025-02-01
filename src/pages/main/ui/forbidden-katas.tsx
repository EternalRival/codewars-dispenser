import { useDispatch, useSelector } from '~/app/store';
import { updateForbiddenKatas } from '~/entities/kata';
import { Textarea } from '~/shared/ui/textarea';

export const ForbiddenKatas = () => {
  const value = useSelector((store) => store.katas.rawForbiddenKatas);
  const dispatch = useDispatch();

  return (
    <Textarea
      value={value}
      onChange={(event) => {
        if (event.target instanceof HTMLTextAreaElement) {
          dispatch(updateForbiddenKatas(event.target.value));
        }
      }}
    />
  );
};
