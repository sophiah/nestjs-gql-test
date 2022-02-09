from curses import meta
from importlib.metadata import metadata
from multiprocessing.connection import wait
import time
import uuid

import grpc
from locust import HttpUser, between, task


class GraphqlTest(HttpUser):
    wait_time = between(3, 5)

    @task
    def author(self):
        query = '''
            query goodread {
                gauthors(author_ids: ["1077326"]) {
                    author_id, name, avg_rating,
                }
            }
            '''
        response = self.client.post(
            "/graphql",
            name="GraphQL_author",            
            json={"query": query }
        )
    
    @task
    def authorAndBook(self):
        query = '''
            query goodread {
                gauthors(author_ids: ["1077326"]) {
                    author_id, name, avg_rating
                    books {
                      book_id, title, description, avg_rating
                    }
                }
            }
            '''
        response = self.client.post(
            "/graphql",
            name="GraphQL_author_and_book",            
            json={"query": query }
        )

    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)