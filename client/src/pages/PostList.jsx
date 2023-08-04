import { Form, Link, useLoaderData } from "react-router-dom";
import { getPosts } from "../api/posts.js";
import { PostCard } from "../components/PostCard";
import { useEffect, useRef } from "react";

function PostList() {
  const {
    posts,
    searchParams: { query },
  } = useLoaderData();
  const queryRef = useRef();

  useEffect(() => {
    queryRef.current.value = query;
  }, [query]);

  return (
    <>
      <h1 className="page-title">
        Posts{" "}
        <div className="title-btns">
          <Link className="btn btn-outline" to="new">
            New
          </Link>
        </div>
      </h1>

      <Form class="form mb-4">
        <div class="form-row">
          <div class="form-group">
            <label htmlFor="query">Query</label>
            <input type="search" name="query" id="query" ref={queryRef} />
          </div>
          {/* <div class="form-group">
            <label for="userId">Author</label>
            <select type="search" name="userId" id="userId">
              <option value="">Any</option>
              <option value="1">Leanne Graham</option>
              <option value="2">Ervin Howell</option>
              <option value="3">Clementine Bauch</option>
              <option value="4">Patricia Lebsack</option>
              <option value="5">Chelsey Dietrich</option>
              <option value="6">Mrs. Dennis Schulist</option>
              <option value="7">Kurtis Weissnat</option>
              <option value="8">Nicholas Runolfsdottir V</option>
              <option value="9">Glenna Reichert</option>
              <option value="10">Clementina DuBuque</option>
            </select>
          </div> */}
          <button class="btn">Filter</button>
        </div>
      </Form>

      <div className="card-grid">
        {posts.map((post) => (
          <PostCard key={post.id} {...post} />
        ))}
      </div>
    </>
  );
}

async function loader({ request: { signal, url } }) {
  const searchParams = new URL(url).searchParams;
  const query = searchParams.get("query");
  const filterParams = { q: query };

  const posts = getPosts({ signal, params: filterParams });

  return { posts: await posts, searchParams: { query } };
}

export const PostListRoute = {
  loader,
  element: <PostList />,
};
