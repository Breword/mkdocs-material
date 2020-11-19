/*
 * Copyright (c) 2016-2020 Martin Donath <martin.donath@squidfunk.com>
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to
 * deal in the Software without restriction, including without limitation the
 * rights to use, copy, modify, merge, publish, distribute, sublicense, and/or
 * sell copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NON-INFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING
 * FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS
 * IN THE SOFTWARE.
 */

import { SearchResult } from "integrations/search"
import { h, truncate } from "utilities"

/* ----------------------------------------------------------------------------
 * Data
 * ------------------------------------------------------------------------- */

/**
 * CSS classes
 */
const css = {
  item: "md-search-result__item",
  link: "md-search-result__link",
  article: "md-search-result__article md-search-result__article--document",
  section: "md-search-result__article",
  title: "md-search-result__title",
  teaser: "md-search-result__teaser"
}

/* ------------------------------------------------------------------------- */

/**
 * Path of `content-copy` icon
 */
const path =
  "M14,2H6A2,2 0 0,0 4,4V20A2,2 0 0,0 6,22H13C12.59,21.75 12.2,21.44 " +
  "11.86,21.1C11.53,20.77 11.25,20.4 11,20H6V4H13V9H18V10.18C18.71,10.34 " +
  "19.39,10.61 20,11V8L14,2M20.31,18.9C21.64,16.79 21,14 " +
  "18.91,12.68C16.8,11.35 14,12 12.69,14.08C11.35,16.19 12,18.97 " +
  "14.09,20.3C15.55,21.23 17.41,21.23 " +
  "18.88,20.32L22,23.39L23.39,22L20.31,18.9M16.5,19A2.5,2.5 0 0,1 " +
  "14,16.5A2.5,2.5 0 0,1 16.5,14A2.5,2.5 0 0,1 19,16.5A2.5,2.5 0 0,1 16.5,19Z"

/* Render icon */
const icon = (path: string) => (
  <div class="md-search-result__icon md-icon">
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
      <path d={path}></path>
    </svg>
  </div>
)

/* ----------------------------------------------------------------------------
 * Functions
 * ------------------------------------------------------------------------- */

/**
 * Render a search result
 *
 * @param result - Search result
 *
 * @return Element
 */
export function renderSearchResult(
  { article, sections }: SearchResult
) {

  /* Render article and sections */
  const children = [article, ...sections].map(document => {
    const { location, title, text } = document
    return (
      <a href={location} class={css.link} tabIndex={-1}>
        <article class={"parent" in document ? css.section : css.article}>
          {!("parent" in document) && icon(path)}
          <h1 class={css.title}>{title}</h1>
          {text.length > 0 && <p class={css.teaser}>{truncate(text, 320)}</p>}
        </article>
      </a>
    )
  })

  /* Render search result */
  return (
    <li class={css.item}>
      {children}
    </li>
  )
}

export const renderGlobalSearchKeyword = () => {
  const searchInput = document.querySelector('.md-search__input')
  const searchKeyword = searchInput.value
  const searchUrl = `/search?q=${searchKeyword}`

  const magnifyPath =
    'M9.5,3A6.5,6.5 0 0,1 16,9.5C16,11.11 15.41,12.59 ' +
    '14.44,13.73L14.71,14H15.5L20.5,19L19,20.5L14,15.5V14.71L13.73,14.44C12.59,15.41 ' +
    '11.11,16 9.5,16A6.5,6.5 0 0,1 3,9.5A6.5,6.5 0 0,1 9.5,3M9.5,5C7,5 5,7 ' +
    '5,9.5C5,12 7,14 9.5,14C12,14 14,12 14,9.5C14,7 12,5 9.5,5Z'

  return (
    <li class={css.item}>
      <a href={searchUrl} class={css.link} tabIndex={-1}>
        <article class={css.article}>
          {icon(magnifyPath)}
          <h1 class={css.title}>全局搜索 {searchKeyword} 文档</h1>
        </article>
      </a>
    </li>
  )
}