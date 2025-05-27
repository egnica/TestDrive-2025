import PostList from "../../posts.json";
import Link from "next/link";
import styles from "../page.module.css";

const Repository = () => {
  return (
    <div className={styles.repoContain}>
      <div className={styles.headContain}>
        <Link href={"../"}>
          <div
            style={{
              width: "120px",
              textAlign: "center",
              borderRadius: "10px",
              fontSize: "1.15em",
            }}
            className={styles.section2Btn}
          >
            Back
          </div>
        </Link>
        <div className={styles.h1Contain}>
          <h1>Featured Content Archive</h1>
        </div>
      </div>

      <div className={styles.listContain}>
        <h2>Title</h2>
        <h2>Date Posted</h2>
        <h2>Description</h2>
        <h2></h2>
      </div>
      {PostList.Post.map((item, index) => {
        return (
          <div key={index} className={styles.listContain2}>
            <p className={styles.titlePost}>{item.title}</p>
            <p>{item.date}</p>
            <p>{item.description}</p>
            <div>
              <a href={item.link} target="_blank" rel="noreferrer">
                <div className={styles.listBtn}>{item.link_title}</div>
              </a>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default Repository;
