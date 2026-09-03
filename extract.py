import json
import random

with open('src/data/sessions.json', 'r') as f:
    data = json.load(f)

topics = []
for session in data:
    for topic in session.get('topics', []):
        topics.append(topic)

sample = random.sample(topics, min(15, len(topics)))
for t in sample:
    print(f"Title: {t.get('title')}")
    print(f"Category: {t.get('category')}")
    print(f"Key Takeaways: {t.get('keyTakeaways')}")
    print("---")
