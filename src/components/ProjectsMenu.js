import React from 'react';
import { useContext, useState, useEffect } from 'react';
import { MainContext } from './../contexts/MainContext';
import { BsChevronDown, BsViewList } from 'react-icons/bs';
import { Link } from 'react-router-dom';
import { useParams } from 'react-router-dom';

export const ProjectsMenu = () => {
  const { projects, dispatchSetActiveProject } = useContext(MainContext);
  const [openMenu, setOpenMenu] = useState(false);
  const [projectName, SetProjectName] = useState('Projects');

  let { slug } = useParams();

  useEffect(() => {
    const filtered = projects.features.filter(
      (p) => p.properties.slug === slug
    );
    if (filtered.length) setProject(filtered[0]);
  }, [slug]);

  const setProject = (feature) => {
    dispatchSetActiveProject({
      type: 'SET_ACTIVE_PROJECT',
      payload: feature,
    });
    SetProjectName(feature.properties.name);
  };

  return (
    <div>
      <div
        className="menuHeader"
        onClick={() => {
          setOpenMenu(!openMenu);
        }}
      >
        <BsViewList></BsViewList>
        <span className=" text-base font-medium flex-1 duration-200 false">
          {projectName}
        </span>
        <BsChevronDown></BsChevronDown>
      </div>
      {openMenu && (
        <div>
          <ul className="pt-2">
            {projects.features.map((feature, index) => (
              <li
                key={index}
                className="subMenuHeader hoverAnimation"
                onClick={() => {
                  setOpenMenu(!openMenu);
                  setProject(feature);
                }}
              >
                <Link to={`/project/${feature.properties.slug}`}>
                  {feature.properties.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};
