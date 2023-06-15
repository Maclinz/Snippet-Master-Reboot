import React, { useEffect, useMemo, useState } from "react";
import styled from "styled-components";
import {
  atomOneDark,
  docco,
  dark,
  darcula,
  vs,
  idea,
  xcode,
  vs2015,
  obsidian,
  lightfair,
  tomorrow,
  tomorrowNight,
  tomorrowNightBlue,
  tomorrowNightBright,
  tomorrowNightEighties,
  github,
} from "react-syntax-highlighter/dist/cjs/styles/hljs";
import SyntaxHighlighter from "react-syntax-highlighter";
import avatar1 from "../../assets/avatar1.png";
import Image from "next/image";
import { useThemeContext } from "../../context/themeContext";
import Button from "../Button/Button";
import Select from "react-select";
import {
  bookmarkIcon,
  copy,
  edit,
  expand,
  githubIcon,
  heart,
  trash,
} from "../../utils/Icons";
import Link from "next/link";
import { getCookie, isAuth } from "../../actions/auth";
import { useSnippetContext } from "../../context/snippetContext";
import ActionButton from "../ActionButton/ActionButton";
import {
  unbookmarkSnippet,
  bookmarkSnippet,
  likeSnippet,
  unlikeSnippet,
  singleSnippet,
  listBookmarks,
} from "../../actions/snippet";
import Router from "next/router";
import { getUnique } from "../../utils/getUnique";
import { userPublicProfile } from "../../actions/user";

function Snippet({ snippet }) {
  const theme = useThemeContext();

  const [localBookmarks, setLocalBookmarks] = useState([]);

  useEffect(() => {
    userPublicProfile(snippet.postedBy.username).then((data) => {
      setLocalBookmarks(data.user.bookmarks);
    });
  }, []);

  const { deleteSnippet, getSingleSnippet, expandSnippet, loading } =
    useSnippetContext();

  const {
    code,
    title,
    tags,
    postedBy,
    slug,
    language,
    likes,
    icon,
    liked,
    likedBy,
  } = snippet;

  //snippet ref
  const snippetRef = React.useRef();

  //user
  const user = isAuth();

  //All code thems
  const codeThemes = [
    atomOneDark,
    docco,
    dark,
    darcula,
    vs,
    idea,
    xcode,
    vs2015,
    obsidian,
    lightfair,
    tomorrow,
    tomorrowNight,
    tomorrowNightBlue,
    tomorrowNightBright,
    tomorrowNightEighties,
    github,
  ];

  //All code theme names
  const options = [
    { value: atomOneDark, label: "Atom" },
    { value: vs, label: "Vs Code" },
    { value: idea, label: "Idea" },
    { value: xcode, label: "XCode" },
    { value: vs2015, label: "Vs 2015" },
    { value: obsidian, label: "Obsidian" },
    { value: lightfair, label: "Lightfair" },
    { value: tomorrow, label: "Tomorrow" },
    { value: tomorrowNight, label: "Tomorrow Night" },
    { value: tomorrowNightBlue, label: "Tomorrow Night Blue" },
    { value: tomorrowNightBright, label: "Tomorrow Night Bright" },
    { value: tomorrowNightEighties, label: "Tomorrow Night Eighties" },
    { value: github, label: "Github" },
  ];

  //Custom Select styles
  const customStyles = {
    menuList: (base) => ({
      ...base,
      "::-webkit-scrollbar": {
        width: "4px",
      },
      "::-webkit-scrollbar-track": {
        background: "#282c34",
      },
      "::-webkit-scrollbar-thumb": {
        background: "linear-gradient(110.42deg, #CF57A3 29.2%, #4731B6 63.56%)",
        borderRadius: "10px",
      },
      "::-webkit-scrollbar-thumb:hover": {
        background: "#555",
      },
    }),
    option: (provided, state) => ({
      //color: state.isSelected ? theme.colorGrey6 : theme.colorGrey5,
      padding: "10px 20px",
      backgroundColor: theme.colorBg,
      cursor: "pointer",
      transition: "all 0.3s ease-in-out",
      //color: color,
      "&:hover": {
        backgroundColor: theme.colorIcons,
      },
    }),

    control: () => ({
      width: "100%",
      backgroundColor: theme.colorBg3,
      height: "100%",
      borderRadius: "12px",
      display: "flex",
      alignItems: "center",
      border: "none",
      outline: "none",
      padding: ".4rem",
      cursor: "pointer",
    }),
    placeholder: (provided) => ({
      ...provided,
    }),
    indicatorSeparator: () => ({
      display: "none",
    }),
    dropdownIndicator: (provided) => ({
      ...provided,
      //position: position,
    }),
    menu: (provided) => ({
      ...provided,
      background: theme.colorBg,
      width: "220px",
      borderRadius: "12px",
      "::-webkit-scrollbar": {
        width: "4px",
        height: "0px",
      },
      "::-webkit-scrollbar-track": {
        background: "#f1f1f1",
      },
      "::-webkit-scrollbar-thumb": {
        background: "#888",
      },
      "::-webkit-scrollbar-thumb:hover": {
        background: "#555",
      },
    }),

    singleValue: (provided, state) => {
      const opacity = state.isDisabled ? 0.5 : 1;
      const transition = "opacity 300ms";
      const color = theme.headerTextColor;

      return { ...provided, opacity, transition, color };
    },
  };

  //code theme state
  const [codeTheme, setCodeTheme] = useState(codeThemes[0]);
  //copied state
  const [copied, setCopied] = useState(false);
  //expand state
  const [expanded, setExpanded] = useState(false);

  //loacl like
  const [localLikes, setLocalLikes] = useState(likes);
  const [likedByUser, setLikedByUser] = useState(() => {
    if (!likedBy ? [] : likedBy.includes(user?._id)) {
      return true;
    } else {
      return false;
    }
  });

  const [isBookmarked, setIsBookmarked] = useState(() => {
    if (localBookmarks.includes(snippet._id)) {
      return true;
    } else {
      return false;
    }
  });

  const changeCodeTheme = (e) => {
    //set the code theme to the current value
    setCodeTheme(
      codeThemes[options.findIndex((option) => option.value === e.value)]
    );
  };

  const codeString = `${code}`;

  //tag colors
  const tagColors = [
    theme.buttonGradient1,
    theme.buttonGradient2,
    theme.buttonGradient3,
    theme.buttonGradient4,
    theme.buttonGradient5,
    theme.buttonGradient6,
    theme.buttonGradient7,
    theme.buttonGradient8,
    theme.buttonGradient9,
    theme.buttonGradient10,
    theme.buttonGradient11,
    theme.buttonGradient12,
    theme.buttonGradient13,
    theme.buttonGradient14,
  ];

  //randomanize tag colors
  const randomTagColor =
    tagColors[Math.floor(Math.random() * tagColors.length)];

  //randomize with useMemo
  const randomTagColorMemo = useMemo(() => {
    return randomTagColor;
  }, []);

  //smooth scroll into view
  /*const smoothScroll = () => {
        snippetRef.current.scrollIntoView({
            behavior: 'smooth',
        });
    }*/

  //token
  const token = getCookie("token");

  //like and unlike snippet
  const likeSnippetHandler = (snippedId, userId) => {
    likeSnippet(token, snippedId, userId)
      .then((data) => {
        setLocalLikes(data.likes);
        const liked = data.likedBy.find((user) => user._id === userId);
        setLikedByUser(liked ? true : false);
      })
      .catch((err) => {
        console.log("Error Liking Snippet", err);
      });
  };

  const bookmarkHandler = (slug, snippedId) => {
    bookmarkSnippet(slug, token, snippedId)
      .then((data) => {
        console.log("localBookmarks", localBookmarks);
        setLocalBookmarks(() => {
          if (localBookmarks.includes(snippedId)) {
            return localBookmarks.filter((id) => id !== snippedId);
          } else {
            return [...localBookmarks, snippedId];
          }
        });
      })
      .catch((err) => {});

    const bookmarked = localBookmarks.find(
      (snippet) => snippet === snippet._id
    );

    setIsBookmarked(bookmarked ? true : false);
    console.log("isBookmarked", isBookmarked);
  };

  return (
    <SnippetStyled
      theme={theme}
      rand={randomTagColorMemo}
      expanded={expanded}
      likedByUser={likedByUser}
      isBookmarked={isBookmarked}
      token={token}
      ref={snippetRef}
      onDoubleClick={() => {
        getSingleSnippet(slug);
        Router.push(`/snippet/${slug}`);
        console.log("slug", slug);
      }}
    >
      <div className="snippet-con">
        <div className="snippet-top">
          <div className="profile">
            <Image
              src={avatar1}
              alt="avatar"
              width="64"
              height="64"
              className="profile-img"
            />
            <div className="user-text">
              <div className="name-con">
                <h3 className="s-title2">
                  {
                    <Link
                      href={`/profile/${
                        !postedBy.username ? "" : postedBy.username
                      }`}
                    >
                      {!postedBy.username ? "" : postedBy.username}
                    </Link>
                  }
                </h3>
              </div>
              <p className="s-title">Programmer</p>
            </div>
          </div>
          <div className="top-btns">
            <ActionButton
              icon={expand}
              background={randomTagColorMemo}
              click={() => {
                setExpanded(!expanded);
              }}
            />
            <div className="bookmark">
              <ActionButton
                icon={bookmarkIcon}
                background={randomTagColorMemo}
                //blob={'blob'}
                click={() => {
                  //snippetBookmark(slug, snippet._id);
                  //bookmarkSnippetHandler(slug, snippet._id);
                  bookmarkHandler(slug, snippet._id);
                }}
              />
            </div>
          </div>
          <div className="title-lang">
            <h3 className="s-title3">{title}</h3>
            <div className="lang-icon">
              <Image src={icon} alt="js" width="24" height="24" />
            </div>
          </div>
          {/*<button onClick={() => snippetBookmark(slug)}>BookMArks</button>
                    {/*<div className="language">
                        <p>Javascript</p>
                    </div>*/}
          <div className="select-theme">
            <Select
              className="react-select-container"
              options={options}
              onChange={changeCodeTheme}
              styles={customStyles}
              placeholder={"Select A Theme"}
            />
          </div>
        </div>
        <div className="snippet-mid">
          <div className="copy-btn">
            <button
              onClick={() => {
                navigator.clipboard.writeText(codeString);
                setCopied(true);
                setTimeout(() => {
                  setCopied(false);
                }, 2000);
              }}
            >
              {copy}
            </button>
            <p className="s-title3 copy">{copied ? "Copied!" : "Copy"}</p>
          </div>
          <SyntaxHighlighter
            language={`${language ? language : "javascript"}`}
            style={codeTheme}
            showLineNumbers={"True"}
            wrapLongLines={"True"}
          >
            {codeString}
          </SyntaxHighlighter>
        </div>
        <div className="snippet-bottom">
          <div className="snippet-actions">
            <div className="left-actions">
              <Button
                name={!localLikes ? "0" : localLikes}
                backgound={randomTagColorMemo}
                blob={"blob"}
                padding={".6rem 1rem"}
                borderRad={"12px"}
                icon={heart}
                click={() => {
                  if (!isAuth()) {
                    Router.push("/login");
                  } else {
                    likeSnippetHandler(snippet._id, user._id);
                  }
                }}
              />
            </div>
            <div className="right-actions">
              {
                //show the edit button if the user is the owner of the snippet or if the user is an admin
                isAuth() &&
                  (isAuth().role === 0 || isAuth().role === 1) &&
                  isAuth()._id === postedBy._id && (
                    <Button
                      name={"Edit"}
                      backgound={randomTagColorMemo}
                      blob={"blob"}
                      padding={".6rem 1rem"}
                      borderRad={"12px"}
                      icon={edit}
                    />
                  )
              }
              {
                //show the delete button if the user is the owner of the snippet
                isAuth() && isAuth().username === postedBy.username && (
                  <Button
                    name={"Delete"}
                    backgound={randomTagColorMemo}
                    blob={"blob"}
                    padding={".6rem 1rem"}
                    borderRad={"12px"}
                    icon={trash}
                    click={() => {
                      deleteSnippet(slug);
                    }}
                  />
                )
              }
            </div>
          </div>
          <div className="snippet-tags">
            <h3>Tags</h3>
            <div className="tags">
              {tags.map((tag) => {
                return (
                  <Button
                    name={tag.name}
                    backgound={randomTagColorMemo}
                    blob={"blob"}
                    padding={".4rem 1rem"}
                    borderRad={"12px"}
                    key={tag._id}
                  />
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </SnippetStyled>
  );
}

//get initila snippet data

const SnippetStyled = styled.div`
  width: 100%;
  background-color: ${(props) => props.theme.colorBg2};
  border-radius: ${(props) => props.theme.borderRadiusSm};
  position: relative;
  z-index: 1;
  grid-column: ${(props) => (props.expanded ? "span 2" : "span 1")};
  transition: all 0.2s ease-in-out;
  .title-lang {
    display: flex;
    align-items: center;
    justify-content: space-between;
    .lang-icon {
      background: ${(props) => props.theme.colorBg3};
      padding: 0.3rem;
      display: flex;
      align-items: center;
      justify-content: center;
      border-radius: 5px;
      border: 1px solid ${(props) => props.theme.colorIcons3};
    }
  }
  @media screen and (max-width: 1260px) {
    grid-column: initial;
  }
  .bookmark {
    i {
      color: ${(props) =>
        props.isBookmarked
          ? props.theme.colorPrimaryGreen
          : props.theme.colorGrey0} !important;
    }
  }
  .copy {
    background: linear-gradient(180.94deg, #f56693 26.59%, #6fcf97 86.88%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
    text-fill-color: transparent;
  }
  .snippet-con {
    padding: 2rem;
    .snippet-top {
      position: relative;
      .top-btns {
        position: absolute;
        top: 0;
        right: 0;
        display: flex;
        gap: 0.7rem;
      }
      .profile {
        position: relative;
        border-radius: 50%;
        display: flex;
        align-items: center;
        .profile-img {
          border-radius: 50%;
          border: 2px solid ${(props) => props.theme.colorPrimary} !important;
        }
        .user-text {
          margin-left: 1rem;
          h3 {
            color: ${(props) => props.theme.colorPrimaryGreen};
            &:hover {
              color: ${(props) => props.theme.colorPrimary};
              text-decoration: underline;
            }
          }
        }
      }
      .s-title3 {
        margin: 1rem 0;
        background: linear-gradient(91deg, #f56693, #6fcf97 55%);
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
        background-clip: text;
        text-fill-color: transparent;
      }
    }
    .snippet-mid {
      margin-top: 0.5rem;
      margin-left: 0;
      margin-right: 0;
      margin-bottom: 2rem;
      position: relative;
      .copy-btn {
        position: absolute;
        top: 20px;
        right: 20px;
        //background: ${(props) => props.theme.colorPrimary};
        padding: 0.4rem 0.7rem;
        border-radius: ${(props) => props.theme.borderRadiusSm};
        cursor: pointer;
        transition: all 0.3s ease-in-out;
        display: flex;
        align-items: center;
        justify-content: center;
        flex-direction: column;
        &:hover {
          i {
            transform: scale(1.1);
            transition: all 0.3s ease-in-out;
            color: #cf57a3;
            opacity: 1;
          }
        }
        i {
          font-size: 1.3rem;
          background: linear-gradient(
            180.94deg,
            #f56693 26.59%,
            #6fcf97 86.88%
          );
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          text-fill-color: transparent;
          opacity: 0.8;
          transition: all 0.3s ease-in-out;
        }
      }
      pre {
        border-radius: ${(props) => props.theme.borderRadiusSm};
        max-height: ${(props) => (props.expanded ? "600px" : "350px")};
        height: ${(props) => (props.expanded ? "500px" : "350px")};
        code {
          font-weight: 500;
        }
      }
    }
    .snippet-bottom {
      .snippet-actions {
        margin: 1rem 0;
        display: flex;
        justify-content: space-between;
        button {
          border: 1px solid ${(props) => props.theme.colorIcons};
          transition: all 0.4s ease-in-out;
          &:hover {
            box-shadow: ${(props) => props.theme.shadow5};
            transition: all 0.4s ease-in-out;
            color: ${(props) => props.theme.colorGrey0};
            i {
              color: ${(props) => props.theme.colorGrey0};
              transition: all 0.4s ease-in-out;
            }
          }
          i {
            color: ${(props) => props.theme.colorGrey0};
          }
        }
        .right-actions {
          display: flex;
          button {
            margin-left: 0.7rem;
          }
        }
      }
      .snippet-tags {
        h3 {
          margin-bottom: 0.6rem;
        }
        .tags {
          display: flex;
          flex-wrap: wrap;
          button {
            transition: all 0.4s ease-in-out;
            margin-bottom: 0.5rem;
            &:not(:last-child) {
              margin-right: 0.5rem;
            }
            border: 1px solid ${(props) => props.theme.colorIcons};
            &:hover {
              box-shadow: ${(props) => props.theme.shadow5};
              transition: all 0.4s ease-in-out;
            }
          }
        }
      }
    }
  }

  .left-actions {
    button {
      i {
        color: ${(props) =>
          props.likedByUser
            ? props.theme.colorPrimaryGreen
            : props.theme.colorGrey0} !important;
      }
    }
  }
`;

export default Snippet;
