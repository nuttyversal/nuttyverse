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

--
-- Name: update_updated_at_column(); Type: FUNCTION; Schema: public; Owner: -
--

CREATE FUNCTION public.update_updated_at_column() RETURNS trigger
	LANGUAGE plpgsql
	AS $$
BEGIN
	NEW.updated_at = NOW();
	RETURN NEW;
END;
$$;


SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: media; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.media (
	id uuid NOT NULL,
	created_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP,
	updated_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP,
	original_object_id uuid NOT NULL,
	compressed_object_id uuid NOT NULL,
	width integer NOT NULL,
	height integer NOT NULL
);


--
-- Name: objects; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.objects (
	id uuid NOT NULL,
	created_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP,
	updated_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP,
	bucket_name character varying(255) NOT NULL,
	object_name character varying(255) NOT NULL
);


--
-- Name: schema_migrations; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.schema_migrations (
	version character varying(128) NOT NULL
);


--
-- Name: media media_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.media
	ADD CONSTRAINT media_pkey PRIMARY KEY (id);


--
-- Name: objects objects_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.objects
	ADD CONSTRAINT objects_pkey PRIMARY KEY (id);


--
-- Name: schema_migrations schema_migrations_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.schema_migrations
	ADD CONSTRAINT schema_migrations_pkey PRIMARY KEY (version);


--
-- Name: objects unique_object; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.objects
	ADD CONSTRAINT unique_object UNIQUE (bucket_name, object_name);


--
-- Name: media update_media_updated_at; Type: TRIGGER; Schema: public; Owner: -
--

CREATE TRIGGER update_media_updated_at BEFORE UPDATE ON public.media FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();


--
-- Name: objects update_objects_updated_at; Type: TRIGGER; Schema: public; Owner: -
--

CREATE TRIGGER update_objects_updated_at BEFORE UPDATE ON public.objects FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();


--
-- Name: media fk_compressed_object; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.media
	ADD CONSTRAINT fk_compressed_object FOREIGN KEY (compressed_object_id) REFERENCES public.objects(id);


--
-- Name: media fk_original_object; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.media
	ADD CONSTRAINT fk_original_object FOREIGN KEY (original_object_id) REFERENCES public.objects(id);


--
-- PostgreSQL database dump complete
--


--
-- Dbmate schema migrations
--

INSERT INTO public.schema_migrations (version) VALUES
	('20240518021715'),
	('20240524233947'),
	('20240525180433');
