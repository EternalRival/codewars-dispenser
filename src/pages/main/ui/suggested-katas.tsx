import { useDispatch, useSelector } from '~/app/store';
import { updateSuggestedKatas } from '~/entities/kata';
import { Textarea } from '~/shared/ui/textarea';

export const SuggestedKatas = () => {
  const value = useSelector((store) => store.katas.rawSuggestedKatas);
  const dispatch = useDispatch();

  return (
    <Textarea
      className="text-sm"
      rows={4}
      value={value}
      onChange={(event) => {
        if (event.target instanceof HTMLTextAreaElement) {
          dispatch(updateSuggestedKatas(event.target.value));
        }
      }}
    />
  );
};
