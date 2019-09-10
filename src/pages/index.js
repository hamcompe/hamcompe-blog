import React from "react"
import { Link as GatsbyLink, graphql } from "gatsby"
import styled from "@emotion/styled"

import Bio from "../components/bio"
import Layout from "../components/layout"
import SEO from "../components/seo"
import { rhythm } from "../utils/typography"

const Link = styled(GatsbyLink)`
  font-weight: 700;
  color: #111;
  box-shadow: none;

  &:hover {
    text-decoration: underline;
  }
`
const Time = styled.time`
  display: inline-block;
  color: #666;
  font-weight: 400;
  font-size: 0.875rem;
  margin-bottom: 1rem;
`
const BlogWrapper = styled.div`
  margin-bottom: 5rem;
`
const ReadMoreLink = styled(GatsbyLink)`
  display: inline-block;
  font-family: "Montserrat", "sans-serif";
  color: #111;
  font-weight: 700;
  box-shadow: none;
  border-bottom: 2px solid transparent;

  > span {
    transition: margin-left 0.3s ease;
    margin-left: 0.5rem;
  }

  &:hover {
    > span {
      margin-left: 1rem;
    }
    border-color: #111;
  }
`
const ArrowWrapper = styled.span``

class BlogIndex extends React.Component {
  render() {
    const { data } = this.props
    const siteTitle = data.site.siteMetadata.title
    const posts = data.allMarkdownRemark.edges

    return (
      <Layout location={this.props.location} title={siteTitle}>
        <SEO title="All posts" />
        <Bio />
        {posts.map(({ node }) => {
          const title = node.frontmatter.title || node.fields.slug
          return (
            <BlogWrapper key={node.fields.slug}>
              <h3
                style={{
                  marginBottom: rhythm(1 / 4),
                }}
              >
                <Link to={node.fields.slug}>{title}</Link>
              </h3>
              <Time>{node.frontmatter.date}</Time>
              <p
                dangerouslySetInnerHTML={{
                  __html: node.frontmatter.description || node.excerpt,
                }}
              />

              <ReadMoreLink to={node.fields.slug}>
                READ MORE
                <ArrowWrapper>→</ArrowWrapper>
              </ReadMoreLink>
            </BlogWrapper>
          )
        })}
      </Layout>
    )
  }
}

export default BlogIndex

export const pageQuery = graphql`
  query {
    site {
      siteMetadata {
        title
      }
    }
    allMarkdownRemark(sort: { fields: [frontmatter___date], order: DESC }) {
      edges {
        node {
          excerpt
          fields {
            slug
          }
          frontmatter {
            date(formatString: "MMMM DD, YYYY")
            title
            description
          }
        }
      }
    }
  }
`
