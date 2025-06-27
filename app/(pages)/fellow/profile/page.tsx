"use client";

import classNames from "classnames";
import styles from "./style.module.scss";
import { Icons, Images } from "assets";
import Image from "next/image";
import ProgressBar from "components/common/progressBar";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { GetUserWithSkills } from "services/user";
import { updateUserSkills } from "redux/reducers/authSlice";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Profile = () => {
  const dispatch = useDispatch();
  const { user } = useSelector((state: any) => state.root.auth);
  const router = useRouter();

  // About Me Section
  const [about, setAbout] = useState(
    "As a fervent ReactJS Developer with a robust command of JavaScript, I am committed to architecting sophisticated, dynamic, and intuitively engaging web applications."
  );
  const [editingAbout, setEditingAbout] = useState(false);
  const [tempAbout, setTempAbout] = useState(about);

  // Technical Proficiencies
  const [techSkills, setTechSkills] = useState([
    { id: 1, name: "Figma", description: "UI Design, prototyping", icon: "Figma" },
    { id: 2, name: "VS Code", description: "Code Editor", icon: "VSCode" },
    { id: 3, name: "Shopify", description: "E-commerce Platform", icon: "Shopify" },
  ]);
  const [editingTech, setEditingTech] = useState(false);
  const [tempTech, setTempTech] = useState([...techSkills]);

  // Latest Projects
  const [projects, setProjects] = useState([
    { 
      id: 1, 
      title: "Website Prototype", 
      description: "Created a responsive, accessible e-learning platform", 
      link: "https://cnib.ca",
      icon: "Car"
    },
    { 
      id: 2, 
      title: "E-commerce Dashboard", 
      description: "Built analytics dashboard for online store", 
      link: "https://fitonist.com",
      icon: "Fitonist"
    },
  ]);
  const [editingProjects, setEditingProjects] = useState(false);
  const [tempProjects, setTempProjects] = useState([...projects]);

  useEffect(() => {
    console.log("User object:", user);
  }, [user]);

  const calculateSkillProgress = (skill: string) => {
    const skillWeights: Record<string, number> = {
      "Programming & Development": 90,
      "Data Science & AI": 73,
      "UI/UX Design": 45,
      "Frontend Development": 85,
      "Backend Development": 75,
      "DevOps": 65
    };
    return skillWeights[skill] || 70;
  };

  // Calculate metrics
  const totalSkills = user?.skills?.length || 0;
  const highestProficiency = user?.skills?.length
    ? Math.max(...user.skills.map((skill: string) => calculateSkillProgress(skill)))
    : 0;
  const assessmentsTaken = user?.assessmentsTaken || 0;

  useEffect(() => {
    const loadUserSkills = async () => {
      if (!user?._id) return;
      try {
        const response = await GetUserWithSkills(user._id);
        dispatch(updateUserSkills({
          skills: response.data.user?.skills || []
        }));
      } catch (error) {
        console.error("Failed to fetch user skills:", error);
      }
    };
    loadUserSkills();
  }, [user?._id, dispatch]);

  // Section handlers
  const handleSaveAbout = () => {
    setAbout(tempAbout);
    setEditingAbout(false);
    toast.success("About section updated!");
  };

  const handleSaveTech = () => {
    setTechSkills([...tempTech]);
    setEditingTech(false);
    toast.success("Technical skills updated!");
  };

  const handleSaveProjects = () => {
    setProjects([...tempProjects]);
    setEditingProjects(false);
    toast.success("Projects updated!");
  };

  // Add new items
  const addTechSkill = () => {
    setTempTech([
      ...tempTech,
      { id: Date.now(), name: "", description: "", icon: "" }
    ]);
  };

  const addProject = () => {
    setTempProjects([
      ...tempProjects,
      { id: Date.now(), title: "", description: "", link: "", icon: "" }
    ]);
  };

  // Update items
  const updateTechSkill = (id: number, field: string, value: string) => {
    setTempTech(tempTech.map(item => 
      item.id === id ? { ...item, [field]: value } : item
    ));
  };

  const updateProject = (id: number, field: string, value: string) => {
    setTempProjects(tempProjects.map(project => 
      project.id === id ? { ...project, [field]: value } : project
    ));
  };

  // Delete items
  const deleteTechSkill = (id: number) => {
    setTempTech(tempTech.filter(item => item.id !== id));
  };

  const deleteProject = (id: number) => {
    setTempProjects(tempProjects.filter(project => project.id !== id));
  };

  return (
    <div className={classNames(styles.customContainer)}>
      <ToastContainer position="bottom-right" />
      <div className={classNames(styles.pageDetailWrapper)}>
        <div className={classNames(styles.box)}>

          <div className={classNames(styles.stepItem, "flex items-center gap-10")}>

            <div className={classNames(styles.iconContainer)}>
              <Image style={{ "width": 120, "height": 120 }} src={Images.DefaultAvatar} alt="user profile" />
            </div>

            <div className={classNames(styles.itemContent, "flex flex-col gap-4")}>

              <h6>{user?.first_name} {user?.last_name}</h6>
              <div className="flex gap-4">
                <div className="flex gap-1" >
                  <Icons.UserProfileIcon />
                  <span>ReactJS Developer</span>
                </div>
                <div className="flex gap-1" >
                  <Icons.LocationPin />
                  <span>Lahore, Pakistan</span>
                </div>
                <div className="flex gap-1" >
                  <Icons.Email />
                  <span>{user?.email}</span>
                </div>
              </div>

              <div className="flex gap-6">
                <div className={classNames(styles.stepItem, "flex items-center gap-6")}>
                  <Icons.Reward />
                  <div className={classNames(styles.itemContent, "flex flex-col gap-4")}>
                    <h3>{totalSkills}</h3>
                    <span>Total Skills Aquired</span>
                  </div>
                </div>

                <div className={classNames(styles.stepItem, "flex items-center gap-6")}>
                  <Icons.Star />
                  <div className={classNames(styles.itemContent, "flex flex-col gap-4")}>
                    <h3>{highestProficiency}%</h3>
                    <span>Highest Proficiency</span>
                  </div>
                </div>

                <div className={classNames(styles.stepItem, "flex items-center gap-6")}>
                  <Icons.Bar />
                  <div className={classNames(styles.itemContent, "flex flex-col gap-4")}>
                    <h3>{assessmentsTaken}</h3>
                    <span>Assessments Taken</span>
                  </div>
                </div>
              </div>

            </div>

            <div className={classNames(styles.progress, "flex gap-4")}>
              <div className="flex flex-col gap-2">
                <h6>Progress</h6>
                <div className="flex">
                  <Icons.Maximize />
                  <span style={{ "color": "#3BDA58" }}>+3.50%</span>
                </div>
              </div>
              <div className={classNames(styles.imageContainer)}>
                <Image src={Images.Chart} alt="chart" />
              </div>
            </div>

          </div>

          <div className="grid lg:grid-cols-3 sm:grid-cols-2 lg:grid-cols-[30%_35%_30%] grid-cols-1 lg:gap-7 sm:gap-5 xs:gap-4 gap-3 pt-8">

            <div className={classNames(styles.stepItem, "flex items-center gap-10")}>

              <div className={classNames(styles.content, "flex flex-col gap-4")}>
                <h4>Skills</h4>

                {user?.skills?.length > 0 ? (
                  user.skills.map((skill: string, index: number) => (
                    <div key={index} className="flex flex-col gap-6 pl-6 w-full">
                      <div className="flex justify-between items-center">
                        <span className="text-sm">{skill}</span>
                        <span className="text-xs text-gray-500">{calculateSkillProgress(skill)}%</span>
                      </div>
                      <ProgressBar
                        percent={calculateSkillProgress(skill)}
                        style={{
                          color: index === 0 ? "#28A745" :
                            index === 1 ? "#F39C12" :
                              "#0092D6"
                        }}
                      />
                    </div>
                  ))
                ) : (
                  <div className="flex flex-col gap-2 w-full">
                    <ProgressBar percent={0} />
                    <p>No skills assessed yet</p>
                    <p className={styles.takeTestPrompt}>
                      Take the test to discover your skills!
                    </p>
                  </div>
                )}

                <Image
                  src={Images.Gragh}
                  alt="skill graph"
                  width={180}
                  height={220}
                  className="hidden lg:block flex-shrink-0 pt-6"
                />
              </div>
            </div>

            {/* About Me Section - Updated */}
            <div className={classNames(styles.stepItem, "flex flex-col gap-4")}>
              <div className="flex justify-between items-center">
                <h4>About Me</h4>
                <button 
                  onClick={() => {
                    setTempAbout(about);
                    setEditingAbout(!editingAbout);
                  }}
                  className="flex items-center gap-1 text-blue-600 hover:text-blue-800"
                >
                  {editingAbout ? <Icons.Clock /> : <Icons.EditIcon />}
                  <span className="text-sm">{editingAbout ? "Cancel" : "Edit"}</span>
                </button>
              </div>
              
              {editingAbout ? (
                <div className="space-y-4">
                  <textarea
                    value={tempAbout}
                    onChange={(e) => setTempAbout(e.target.value)}
                    className="w-full p-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 min-h-[150px]"
                    placeholder="Tell us about yourself..."
                  />
                  <div className="flex justify-end gap-3">
                    <button
                      onClick={() => setEditingAbout(false)}
                      className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
                    >
                      Cancel
                    </button>
                    <button
                      onClick={handleSaveAbout}
                      className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                    >
                      Save Changes
                    </button>
                  </div>
                </div>
              ) : (
                <p className="text-gray-700 leading-relaxed">{about}</p>
              )}

              <h4 className="pt-4">Contact</h4>

              <div className="flex items-center gap-6">
                <Icons.PhoneIcon />
                <div className={classNames(styles.itemContent, "flex flex-col pt-4 gap-4")}>
                  <h6>Phone</h6>
                  <span>{user?.phone}</span>
                </div>
              </div>

              <div className="flex items-center gap-6">
                <Icons.EmailBold />
                <div className={classNames(styles.itemContent, "flex flex-col pt-4 gap-4")}>
                  <h6>Email</h6>
                  <span>{user?.email}</span>
                </div>
              </div>
            </div>

            <div className={classNames(styles.stepItem, "flex items-center")}>
              <div className="flex flex-col gap-10 pb-12">
                <h4 className="pb-8">Socials</h4>
                <div className="flex items-center gap-3">
                  <button style={{ background: "rgba(221, 230, 252, 0.6)" }}>
                    <Icons.Facebook />
                  </button>
                  <div>
                    <span style={{ background: "rgba(221, 230, 252, 0.6)" }}
                      className={classNames(styles.link, "")}>www.facebook.com</span>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <button style={{ background: "rgba(201, 191, 255, 0.3)" }}>
                    <Icons.LinkedIn />
                  </button>
                  <div>
                    <span style={{ background: "rgba(201, 191, 255, 0.3)" }}
                      className={classNames(styles.link)}>www.linkedin.com</span>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <button style={{ background: "rgba(78, 49, 69, 0.15)" }}>
                    <Icons.Github />
                  </button>
                  <div>
                    <span style={{ background: "rgba(78, 49, 69, 0.15)" }}
                      className={classNames(styles.link)}>www.github.com</span>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <button style={{ background: "rgba(252, 186, 190, 0.4)" }}>
                    <Icons.Youtube />
                  </button>
                  <div>
                    <span style={{ background: "rgba(252, 186, 190, 0.4)" }}
                      className={classNames(styles.link)}>www.youtube.com</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Technical Proficiencies Section - Updated */}
          <div className="mt-8">
            <div className="flex justify-between items-center mb-4">
              <h4>Technical Proficiencies</h4>
              <button 
                onClick={() => {
                  setTempTech([...techSkills]);
                  setEditingTech(!editingTech);
                }}
                className="flex items-center gap-1 text-blue-600 hover:text-blue-800"
              >
                {editingTech ? <Icons.Clock/> : <Icons.EditIcon />}
                <span className="text-sm">{editingTech ? "Cancel" : "Edit"}</span>
              </button>
            </div>
            
            {editingTech ? (
              <div className="space-y-6">
                {tempTech.map((tech) => (
                  <div key={tech.id} className="flex items-start gap-4 p-4 border border-gray-200 rounded-lg">
                    <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Tool Name
                        </label>
                        <input
                          type="text"
                          value={tech.name}
                          onChange={(e) => updateTechSkill(tech.id, 'name', e.target.value)}
                          className="w-full p-2 border border-gray-300 rounded-lg"
                          placeholder="e.g., Figma"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Description
                        </label>
                        <input
                          type="text"
                          value={tech.description}
                          onChange={(e) => updateTechSkill(tech.id, 'description', e.target.value)}
                          className="w-full p-2 border border-gray-300 rounded-lg"
                          placeholder="e.g., UI Design, prototyping"
                        />
                      </div>
                    </div>
                    <button 
                      onClick={() => deleteTechSkill(tech.id)}
                      className="p-2 text-red-500 hover:bg-red-50 rounded-full"
                    >
                      <Icons.DeleteIcon className="text-xl" />
                    </button>
                  </div>
                ))}
                
                <div className="flex gap-3">
                  <button
                    onClick={addTechSkill}
                    className="flex items-center gap-2 px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-lg"
                  >
                    <Icons.PlusIcon />
                    <span>Add Tool</span>
                  </button>
                  
                  <div className="flex-1 flex justify-end gap-3">
                    <button
                      onClick={() => setEditingTech(false)}
                      className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
                    >
                      Cancel
                    </button>
                    <button
                      onClick={handleSaveTech}
                      className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                    >
                      Save Changes
                    </button>
                  </div>
                </div>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                {techSkills.map((tech) => (
                  <div 
                    key={tech.id} 
                    className="bg-white p-4 rounded-xl border border-gray-200 hover:shadow-md transition-shadow"
                  >
                    <div className="flex items-center gap-3 mb-3">
                      <div className="bg-gray-100 p-2 rounded-lg">
                        <Image 
                          src={Images[tech.icon as keyof typeof Images] || Images.Figma} 
                          alt={tech.name} 
                          width={40} 
                          height={40}
                        />
                      </div>
                      <h6 className="font-semibold">{tech.name}</h6>
                    </div>
                    <p className="text-sm text-gray-600">{tech.description}</p>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Latest Projects Section - Updated */}
          <div className="mt-8">
            <div className="flex justify-between items-center mb-4">
              <h4>Latest Projects</h4>
              <button 
                onClick={() => {
                  setTempProjects([...projects]);
                  setEditingProjects(!editingProjects);
                }}
                className="flex items-center gap-1 text-blue-600 hover:text-blue-800"
              >
                {editingProjects ? <Icons.Clock /> : <Icons.EditIcon />}
                <span className="text-sm">{editingProjects ? "Cancel" : "Edit"}</span>
              </button>
            </div>
            
            {editingProjects ? (
              <div className="space-y-6">
                {tempProjects.map((project) => (
                  <div key={project.id} className="p-4 border border-gray-200 rounded-lg">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Project Title
                        </label>
                        <input
                          type="text"
                          value={project.title}
                          onChange={(e) => updateProject(project.id, 'title', e.target.value)}
                          className="w-full p-2 border border-gray-300 rounded-lg"
                          placeholder="e.g., Website Prototype"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Project Link
                        </label>
                        <input
                          type="text"
                          value={project.link}
                          onChange={(e) => updateProject(project.id, 'link', e.target.value)}
                          className="w-full p-2 border border-gray-300 rounded-lg"
                          placeholder="https://example.com"
                        />
                      </div>
                    </div>
                    <div className="mb-4">
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Description
                      </label>
                      <textarea
                        value={project.description}
                        onChange={(e) => updateProject(project.id, 'description', e.target.value)}
                        className="w-full p-2 border border-gray-300 rounded-lg min-h-[80px]"
                        placeholder="Describe your project..."
                      />
                    </div>
                    <div className="flex justify-end">
                      <button 
                        onClick={() => deleteProject(project.id)}
                        className="flex items-center gap-1 text-red-500 hover:text-red-700"
                      >
                        <Icons.DeleteIcon />
                        <span>Remove Project</span>
                      </button>
                    </div>
                  </div>
                ))}
                
                <div className="flex gap-3">
                  <button
                    onClick={addProject}
                    className="flex items-center gap-2 px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-lg"
                  >
                    <Icons.PlusIcon />
                    <span>Add Project</span>
                  </button>
                  
                  <div className="flex-1 flex justify-end gap-3">
                    <button
                      onClick={() => setEditingProjects(false)}
                      className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
                    >
                      Cancel
                    </button>
                    <button
                      onClick={handleSaveProjects}
                      className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                    >
                      Save Changes
                    </button>
                  </div>
                </div>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {projects.map((project) => (
                  <div 
                    key={project.id} 
                    className="border border-gray-200 rounded-xl overflow-hidden hover:shadow-lg transition-shadow"
                  >
                    <div className="p-5">
                      <div className="flex items-start gap-4">
                        <div className="bg-gray-100 p-3 rounded-lg">
                          <Image 
                            src={Images[project.icon as keyof typeof Images] || Images.Car} 
                            alt={project.title} 
                            width={48} 
                            height={48}
                          />
                        </div>
                        <div>
                          <h5 className="font-bold text-lg">{project.title}</h5>
                          <p className="text-gray-600 mt-2">{project.description}</p>
                        </div>
                      </div>
                      <div className="mt-4 flex items-center">
                        <Icons.Briefcase className="text-gray-500 mr-2" />
                        <a 
                          href={project.link} 
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-blue-600 hover:underline truncate"
                        >
                          {project.link}
                        </a>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

        </div>
      </div>
    </div>
  );
};

export default Profile;