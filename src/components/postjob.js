import React, { Component } from 'react';
import { showAlert } from '../helpers/alert';
import { APIUrls } from '../helpers/urls';
class postjob extends Component {
  constructor(props) {
    super(props);
    this.state = {
      role: '',
      function_value: '',
      sub_function: '',
      company: '',
      core_skills: '',
      soft_skills: '',
      location: '',
      pincode: '',
      compensation: '',
      job_description: '',
      core_skills_list: [],
      soft_skills_list: [],
    };
    this.formRef = React.createRef();
  }

  addCoreSkills = (e) => {
    e.preventDefault();
    const { core_skills } = this.state;
    if (core_skills.length === 0) {
      showAlert('Missing Field', 'Please Enter Skill', 'warning');
      return;
    } else {
      this.setState({
        core_skills_list: [
          ...this.state.core_skills_list,
          core_skills.toLowerCase(),
        ],
        core_skills: '',
      });
    }
  };

  addSoftSkills = (e) => {
    e.preventDefault();
    const { soft_skills } = this.state;
    if (soft_skills.length === 0) {
      showAlert('Missing Field', 'Please Enter Skill', 'warning');
      return;
    } else {
      this.setState({
        soft_skills_list: [...this.state.soft_skills_list, soft_skills],
        soft_skills: '',
      });
    }
  };

  handleChange = (e) => {
    this.setState({ [e.target.id]: e.target.value });
  };

  checkForEmptyField = () => {
    let fields = { ...this.state, location: this.state.location.toLowerCase() };
    delete fields['core_skills'];
    delete fields['soft_skills'];
    console.log(fields);
    for (let object of Object.keys(fields)) {
      if (typeof fields[object] === 'string') {
        if (fields[object].length === 0) {
          showAlert('Missing Field', `Please Enter ${object}`, 'warning');
          return false;
        }
      } else if (fields[object].length < 3) {
        showAlert(
          'Missing Skills',
          `Enter atleast 3 skills at both places`,
          'warning'
        );
        return false;
      }
    }
    return fields;
  };

  makeAPIRequest = (formBody) => {
    const url = APIUrls.createJobPost();
    let context = this;
    console.log(JSON.stringify(formBody), formBody);
    fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formBody),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.success) {
          showAlert('Posted', 'New Job Posted Successfully', 'success');
          context.setState({
            role: '',
            function_value: '',
            sub_function: '',
            company: '',
            core_skills: '',
            soft_skills: '',
            location: '',
            pincode: '',
            compensation: '',
            job_description: '',
            core_skills_list: [],
            soft_skills_list: [],
          });
          return;
        }
        console.log('data', data);
      });
  };

  handleSubmit = (e) => {
    e.preventDefault();
    let finalInput = this.checkForEmptyField();
    if (finalInput === false) {
      return;
    }
    this.makeAPIRequest(finalInput);
  };

  render() {
    const {
      core_skills_list,
      soft_skills_list,
      role,
      compensation,
      company,
      function_value,
      sub_function,
      location,
      pincode,
      core_skills,
      soft_skills,
      job_description,
    } = this.state;
    return (
      <div className="post-job-container">
        <div className="heading">Post Job</div>
        <form ref={this.formRef}>
          <div className="input-container">
            <label>Role</label>
            <input
              id="role"
              type="text"
              required={true}
              placeholder="Role"
              value={role}
              onChange={this.handleChange}
            />
          </div>
          <div className="input-container">
            <label>Function</label>
            <input
              id="function_value"
              type="text"
              required={true}
              placeholder="Function"
              vlaue={function_value}
              onChange={this.handleChange}
            />
          </div>
          <div className="input-container">
            <label>Sub Function</label>
            <input
              id="sub_function"
              type="text"
              required={true}
              placeholder="Sub Function"
              value={sub_function}
              onChange={this.handleChange}
            />
          </div>
          <div className="input-container">
            <label>Company</label>
            <input
              id="company"
              type="text"
              required={true}
              placeholder="Company"
              value={company}
              onChange={this.handleChange}
            />
          </div>
          <div className="input-container">
            <label>Core Skills</label>
            <input
              id="core_skills"
              type="text"
              required={true}
              placeholder="Core Skills"
              value={core_skills}
              onChange={this.handleChange}
            />
            <div className="add-skills" onClick={this.addCoreSkills}>
              Add Skill
            </div>
            <ul className="core-skills-list">
              {core_skills_list.map((item) => {
                return <li>{item}</li>;
              })}
            </ul>
          </div>
          <div className="input-container">
            <label>Soft Skills </label>
            <input
              id="soft_skills"
              type="text"
              required={true}
              placeholder="Soft Skills"
              value={soft_skills}
              onChange={this.handleChange}
            />
            <div className="add-skills" onClick={this.addSoftSkills}>
              Add Skill
            </div>
            <ul className="core-skills-list">
              {soft_skills_list.map((item) => {
                return <li>{item}</li>;
              })}
            </ul>
          </div>
          <div className="input-container">
            <label>Location</label>
            <input
              id="location"
              type="text"
              required={true}
              placeholder="Location"
              value={location}
              onChange={this.handleChange}
            />
          </div>
          <div className="input-container">
            <label>Pincode</label>
            <input
              id="pincode"
              type="number"
              required={true}
              placeholder="Pincode"
              value={pincode}
              onChange={this.handleChange}
            />
          </div>
          <div className="input-container">
            <label>Compensation</label>
            <input
              id="compensation"
              type="number"
              required={true}
              placeholder="Compensation"
              value={compensation}
              onChange={this.handleChange}
            />
          </div>
          <div className="input-container">
            <label>Job Description</label>
            <textarea
              id="job_description"
              rows="5"
              type="text"
              required={true}
              value={job_description}
              placeholder="Detail"
              onChange={this.handleChange}
            />
          </div>
          <button onClick={this.handleSubmit}>Post</button>
        </form>
      </div>
    );
  }
}

export default postjob;
