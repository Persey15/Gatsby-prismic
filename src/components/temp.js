else if (bodyContent.type && bodyContent.type === 'call_to_action_grid') {
   return ( <
      CallToActionGrid key = {
         i
      }
      callToActions = {
         bodyContent.fields
      }
      title = {
         bodyContent.primary.section_title
      }
      />
   )
}

import React from 'react';
import { graphql } from 'gatsby';
import Layout from '../components/layout';
import styled from 'styled-components';
import RichText from '../components/richText';


export const query = graphql`
{
   prismic {
      allContact_pages {
         edges {
         node {
            form_title
            form_description
            form_fields {
               field_name
               field_type
               required
            }
         }
         }
      }
   }
}
`
const Form = styled.form`
    padding: 10px;
    background: #eee;
    margin-top: 20px;
    max-width: 800px;
    margin-left: auto;
    margin-right: auto;
`

const ContentWrapper = styled.section`
    max-width: 800px;
    margin: 0 auto;
`

const Button = styled.button`
    background: orange;
    color: white;
    cursor: pointer;
    padding: 4px 8px;
    box-shadow: none;
    border-radius: 4px;
`

const ContactUs = (props) => {
   console.log(props)
   return (
      <Layout>
         <ContentWrapper>
            <RichText render={props.data.prismic.allContact_pages.edges[0].node.form_title} />
            <RichText render={props.data.prismic.allContact_pages.edges[0].node.form_description} />
            <Form onSubmit={e => e.preventDefault()}>
               {props.data.prismic.allContact_pages.edges[0].node.form_fields.map((field, i) => {
                  if (field.field_type === 'textarea') {
                     return (
                        <div key={i}>
                           <textarea
                              name={field.field_name}
                              required={field.required === 'Yes'}
                              placeholder={field.field_name} />
                        </div>
                     );
                  } else {
                     return (
                        <div key={i}>
                           <input
                              name={field.field_name}
                              placeholder={field.field_name}
                              required={field.required === 'Yes'}
                              type={field.field_type} />
                        </div>
                     )
                  }
               })}
               <Button type="submit">
                  Submit
                </Button>
            </Form>
         </ContentWrapper>

      </Layout>
   )
};


export default ContactUs;

!!!!!!!!!!!!!!!
import React from "react"
import PropTypes from "prop-types"
import { StaticQuery, graphql, Link } from "gatsby"
import "./layout.css"
import styled from 'styled-components'


const MainWrapper = styled.main`
  margin: 0 auto;
 
`

const NavLink = styled.div`
  margin: auto 0;
   a{
    color: white;
    padding: 0 16px;
    text-decoration: none;
    font-weight: bold;
    font-size: 16px;
    &:hover{
      color: orange;
    }
  }
`;
const NavLinks = styled.div`
    margin-left: auto;
  display: flex;
`;

const Header = styled.header`
  display: flex;
  background: black;
  height: 66px;
  padding: 0 16px;
  box-sizing: border-box;
`;

const Branding = styled.div`
  margin: auto 0;
a{
  color: orange;
  font-weight: bold;
  font-size: 20px;
}
  
`

const navigationQuery = graphql`
{
  prismic {
    allNavigations {
      edges {
        node {
          branding
          navigation_links {
            label
            link {
              
              ...on PRISMIC_Page {
                
                _meta {
                  uid
                }
              }
            }
          }
        }
      }
    }
  }
}
`


const Layout = ({ children }) => {


   return (
    <>
         < Header >
            <
               StaticQuery
               query={
                  `${navigationQuery}`
               }
               render={
                  (data) => {
                     console.log(data);
                     return ( <
              >
                        <
              Branding >
                           <
              Link to="/" > {
                                 data.prismic.allNavigations.edges[0].node.branding
                              } <
              /Link> <
              /Branding> <
              NavLinks > {
                                    data.prismic.allNavigations.edges[0].node.navigation_links.map((link) => {
                                       return (<
                    NavLink key={
                                             link.link._meta.uid
                                          } >
                                          <
                    Link to={
                                                `/${link.link._meta.uid}`
                                             } > {
                                                link.label
                                             } <
                    /Link> <
                    /NavLink>
                                           )
                                         })
              } <
              /NavLinks> <
              />
                                             )
                                           }
                                         }
        /> <
        /Header>
      <MainWrapper>{children}</MainWrapper>
                                             < />
                                             )
                                           }
                                           
Layout.propTypes = {
                                                children: PropTypes.node.isRequired,
                                           }
                                           
                                           export default Layout
