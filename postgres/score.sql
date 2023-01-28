
SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- TOC entry 215 (class 1259 OID 16411)
-- Name: score; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.score (
    id integer NOT NULL,
    lecturer_fname text,
    lecturer_lname text,
    lecturer_account text,
    pid text,
    sub_code text,
    sub_name text,
    sub_sect text,
    cmuitaccount text,
    student_id text,
    firstname_th text,
    lastname_th text,
    organization_name_th text,
    score1 numeric,
    score2 numeric,
    score3 numeric,
    score4 numeric,
    score5 numeric,
    score6 numeric,
    dt timestamp without time zone
);


ALTER TABLE public.score OWNER TO postgres;

--
-- TOC entry 214 (class 1259 OID 16410)
-- Name: score_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.score_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.score_id_seq OWNER TO postgres;

--
-- TOC entry 3326 (class 0 OID 0)
-- Dependencies: 214
-- Name: score_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.score_id_seq OWNED BY public.score.id;


--
-- TOC entry 3175 (class 2604 OID 16414)
-- Name: score id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.score ALTER COLUMN id SET DEFAULT nextval('public.score_id_seq'::regclass);


--
-- TOC entry 3319 (class 0 OID 16411)
-- Dependencies: 215
-- Data for Name: score; Type: TABLE DATA; Schema: public; Owner: postgres
--



--
-- TOC entry 3327 (class 0 OID 0)
-- Dependencies: 214
-- Name: score_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.score_id_seq', 1, false);


-- Completed on 2023-01-28 17:29:31 +07

--
-- PostgreSQL database dump complete
--

