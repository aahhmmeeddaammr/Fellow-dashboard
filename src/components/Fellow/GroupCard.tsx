const GroupCard = ({ group }: { group: FellowHomeGroup }) => {
  console.log(group);

  return (
    <div className="col-span-1 border-1 border-[#979797] p-2 rounded-2xl text-[#979797] ">
      <h4 className="text-xl font-semibold text-center">{group.groupName}</h4>
      <div className="text-[10px] mx-3">
        <p>{group.packgeName}</p>
        <p>Age: {group.ageGroup}</p>
        <p>Date: {group.schedule}</p>
        <p>{group.studentsNumber} Students</p>
      </div>
    </div>
  );
};

export default GroupCard;
