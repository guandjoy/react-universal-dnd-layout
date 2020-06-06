import React from "react"
import { Link, useStaticQuery, graphql } from "gatsby"

function SectionWrapper({ item, name, children }) {
  return (
    <div className="section">
      {item && <h2 className="item">{item}</h2>}
      {children}
    </div>
  )
}

export default function SideBar(props) {
  const { allMdx } = useStaticQuery(graphql`
    query SideBarQuery {
      allMdx(
        sort: {
          fields: [frontmatter___sectionOrder, frontmatter___order]
          order: ASC
        }
      ) {
        edges {
          node {
            id
            frontmatter {
              path
              title
              order
              section
              sectionOrder
              unlisted
            }
          }
        }
      }
    }
  `)
  var sections = []
  var names = []
  var independent = []
  allMdx.edges.forEach(edge => {
    const {
      path,
      title,
      section,
      sectionOrder,
      order,
      unlisted,
    } = edge.node.frontmatter
    if (!sections[sectionOrder])
      sections[sectionOrder] = { name: section, subitems: [] }
    if (order === 0) {
      let item = (
        <Link
          className="link"
          activeStyle={{ color: "#33e" }}
          to={edge.node.frontmatter.path}
        >
          {edge.node.frontmatter.title}
        </Link>
      )
      sections[sectionOrder].item = item
    } else {
      let subitem = (
        <li className="subitem" key={path}>
          <Link
            className="link"
            activeStyle={{ color: "#33e" }}
            to={edge.node.frontmatter.path}
          >
            {edge.node.frontmatter.title}
          </Link>
        </li>
      )
      !unlisted && sections[sectionOrder].subitems.push(subitem)
    }
  })
  sections = sections.map(section => (
    <SectionWrapper name={section.name} item={section.item} key={section.name}>
      <ul className="subitems">{section.subitems}</ul>
    </SectionWrapper>
  ))
  return (
    <div
      className="sections"
      ref={props.sideBarRef}
      style={{
        display: props.isVisible && "inline",
        "--sidebar-zindex": props.isVisible ? "6" : "2",
      }}
    >
      {sections}
    </div>
  )
}
