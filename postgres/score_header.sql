
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
-- TOC entry 217 (class 1259 OID 16404)
-- Name: score_header; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.score_header (
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
    score1 text,
    score2 text,
    score3 text,
    score4 text,
    score5 text,
    score6 text,
    dt timestamp without time zone
);


ALTER TABLE public.score_header OWNER TO postgres;

--
-- TOC entry 216 (class 1259 OID 16403)
-- Name: score_header_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.score_header_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.score_header_id_seq OWNER TO postgres;

--
-- TOC entry 3330 (class 0 OID 0)
-- Dependencies: 216
-- Name: score_header_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.score_header_id_seq OWNED BY public.score_header.id;


--
-- TOC entry 3179 (class 2604 OID 16407)
-- Name: score_header id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.score_header ALTER COLUMN id SET DEFAULT nextval('public.score_header_id_seq'::regclass);


--
-- TOC entry 3323 (class 0 OID 16404)
-- Dependencies: 217
-- Data for Name: score_header; Type: TABLE DATA; Schema: public; Owner: postgres
--



--
-- TOC entry 3331 (class 0 OID 0)
-- Dependencies: 216
-- Name: score_header_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.score_header_id_seq', 2, true);


-- Completed on 2023-01-31 17:12:29 +07

--
-- PostgreSQL database dump complete
--

