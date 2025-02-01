import { useDispatch, useSelector } from '~/app/store';
import { updateSuggestedKatas } from '~/entities/kata';
import { Textarea } from '~/shared/ui/textarea';

const SuggestedKatas = () => {
  const value = useSelector((store) => store.katas.rawSuggestedKatas);
  const dispatch = useDispatch();

  return (
    <Textarea
      value={value}
      onChange={(event) => {
        if (event.target instanceof HTMLTextAreaElement) {
          dispatch(updateSuggestedKatas(event.target.value));
        }
      }}
    />
  );
};

export default SuggestedKatas;
