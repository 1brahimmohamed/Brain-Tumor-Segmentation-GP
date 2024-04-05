import { useState } from 'react';
import classnames from 'classnames';
import EditIcon from '@mui/icons-material/Edit';

type TMeasurementItem = {
    uid: string | number;
    index: number;
    label: string;
    displayText: string[];
    isActive: boolean;
    isLocked: boolean;
    onClick: (data: { uid: string | number; isActive: boolean; event: MouseEvent }) => void;
    onEdit: (data: { uid: string | number; isActive: boolean; event: MouseEvent }) => void;
};



const MeasurementItem = ({
  uid,
  index,
  label,
  displayText,
  isActive,
  isLocked,
  onClick,
  onEdit,
}: TMeasurementItem) => {
  const [isHovering, setIsHovering] = useState(false);

  const onEditHandler = (event:any) => {
    event.stopPropagation();
    onEdit({ uid, isActive, event });
  };

  const onClickHandler = (event: any) => onClick({ uid, isActive, event });

  const onMouseEnter = () => setIsHovering(true);
  const onMouseLeave = () => setIsHovering(false);

  return (
    <div
      className={classnames(
        'group flex cursor-pointer border border-transparent bg-AASecondShade outline-none transition duration-300',
        {
          'border-primary-light overflow-hidden rounded': isActive,
        }
      )}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      onClick={onClickHandler}
      role="button"
      tabIndex={0}
      data-cy={'measurement-item'}
    >
      <div
        className={classnames('w-6 py-1 text-white text-center text-base transition duration-300', {
          'bg-AAPrimary active': isActive,
          'bg-AAPrimary bg-opacity-20  group-hover:bg-opacity-60': !isActive,
        })}
      >
        {index}
      </div>
      <div className="relative flex flex-1 flex-col px-2 py-1">
        <span className="text-primary-light mb-1 text-base">{label}</span>
        {displayText.map((line, i) => (
          <span
            key={i}
            className="border-primary-light border-l pl-2 text-base text-white"
            dangerouslySetInnerHTML={{ __html: line }}
          ></span>
        ))}
        {!isLocked && (
          <EditIcon
            className={classnames(
              'absolute w-4 cursor-pointer text-white transition duration-300',
              { 'invisible mr-2 opacity-0': !isActive && !isHovering },
              { 'opacity-1 visible': !isActive && isHovering }
            )}
            style={{
              top: 4,
              right: 4,
              transform: isActive || isHovering ? '' : 'translateX(100%)',
            }}
            onClick={onEditHandler}
          />
        )}
      </div>
    </div>
  );
};

export default MeasurementItem;
