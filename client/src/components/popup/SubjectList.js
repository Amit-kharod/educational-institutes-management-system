import React, { Fragment, useState } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { toTitleCase, nToNth } from '../../utils/stringFunctions';

const SubjectList = ({
  currentModificationState,
  subjectValidation,
  adminData,
}) => {
  let isSubject = false;
  const [subjectData, setSubjectData] = useState({
    subjectName: '',
  });
  const { subjects } = adminData;
  console.log(subjects[0]);
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
      {subjects[0] && (
        subjects.map((item,i) => {
          if (item.programme.toUpperCase() === programme && item.sem == sem.charAt(0)) {
            isSubject = true;
            return <div key={i}>{toTitleCase(item.name)}</div>;
          }
        })
      )}
    {
      !isSubject && <em>no subjects to show</em>
    }
      <strong className="heading-margin">Add Subject</strong>
      <div id="subjectName">
        <span>Name</span>
        <input
          className="input-medium"
          type="text"
          name="subjectName"
          placeholder="eg. Operating System"
          value={subjectName}
          onChange={(e) => onSubjectChange(e)}
        />
      </div>
      <button
        className="next-popup"
        onClick={() => subjectValidation(subjectName)}
      >
        Next
      </button>
    </Fragment>
  );
};

SubjectList.propTypes = {
  adminData: PropTypes.object,
};

const mapStateToProps = (state) => ({
  adminData: state.auth.adminData,
});

export default connect(mapStateToProps, {})(SubjectList);
