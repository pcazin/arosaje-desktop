import Post from "../../components/home/Post";
import SearchBar from "../../components/home/searchBar";
import PlanteService from "../../services/PlanteService";
import "./styles.css";
import { useEffect, useState } from "react";
import { PostProps } from "../../shared/PostProps.js";
import React from "react";
import { useNavigate } from "react-router-dom";
import { PostContainer } from "./postContainer";

export default function HomePage() {
    const navigate = useNavigate();

    const [data, setData] = useState<PostProps[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [posts, setPosts] = useState<React.ReactElement<typeof Post>[]>([]);

    useEffect(() => {
        async function fetchData() {
            try {
                const res = await PlanteService.getFeed();
                const newData: PostProps[] = res.data;
                setData(newData);
                setPosts(getPostsFromData(newData))
            } catch (err) {
                console.error(err);
                navigate("/login");
            } finally {
                setLoading(false);
            }
        }

        fetchData();
    }, []);

    const postQueryFilter = (post: PostProps, query: string): boolean => {
        if (
            post?.name?.toLowerCase().includes(query) ||
            post?.type?.toLowerCase().includes(query) ||
            post?.user?.location?.toLowerCase().includes(query)
        ) {
            return true;
        }

        return false;
    };

    const getPostsFromData = (data: PostProps[]): React.ReactElement<typeof Post>[] => {
        return data.map((post, index) => <Post data={post} key={index} />);
    };

    const handleSearch = (query: string): void => {
        
        // je retire les espaces et mets la query en minuscule
        query = query.trim().toLowerCase()

        // j'affiche le chargement
        setLoading(true);

        // si la query est nulle, je garde tous les posts
        if(query === "") {
            setPosts(getPostsFromData(data))
            setLoading(false);
            return;
        }

        // sinon je filtre la données
        const filteredPostsData: PostProps[] = data.filter((post: PostProps) => postQueryFilter(post, query))

        // je set les posts avec les données filtrées
        setPosts(getPostsFromData(filteredPostsData))
    
        // je retire le chargement
        setLoading(false);
    };

    const dataToDisplay = (): React.ReactNode => {
        if (loading) {
            return (<p className="text-center">loading...</p>);
        }

        if (posts.length === 0) {
            return (<p className="text-center">aucune données à afficher</p>);
        }

        return posts;
    };

    return (
        <div id="home">
            <h1>Arosa<span className="test">je</span></h1>
            <SearchBar onSearch={handleSearch} />
            <PostContainer posts={dataToDisplay()}/>
        </div>
    );
}
