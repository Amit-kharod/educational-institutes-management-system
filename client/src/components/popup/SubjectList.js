import React, { Fragment, useState } from 'react';

const SubjectList = ({ currentModificationState, subjectValidation }) => {
  const [subjectData, setSubjectData] = useState({
    subjectName: '',
  });
  const { subjectName } = subjectData;
  const onSubjectChange = (e) =>
    setSubjectData({ [e.target.name]: e.target.value });
  const { department, programme, sem, subject, teacher } =
    currentModificationState;
  return (
    <Fragment>
      <strong className="heading-margin">
        {programme} {sem} Sem Subjects
      </strong>
      <em>no subjects to show</em>
      <strong className="heading-margin">Add Subject</strong>
      <div id="subjectName">
        <span>Name</span>
        <input
          className="input-medium"
          type="text"
          name="subjectName"
          placeholder="eg. Department of Biology"
          value={subjectName}
          onChange={(e) => onSubjectChange(e)}
        />
      </div>
      <button className="next-popup" onClick={() => subjectValidation(subjectName)}>
        Add
      </button>
    </Fragment>
  );
};

export default SubjectList;
