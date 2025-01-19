import os
from dotenv import load_dotenv
import cohere


def get_cohere_api_key():
    """
    Retrieves the Cohere API key from an environment variable.
    """
    api_key = os.getenv("COHERE_API_KEY")
    if not api_key:
        raise EnvironmentError("COHERE_API_KEY environment variable not set.")
    return api_key

def extract_info(user_input, cohere_client):
    """
    Answer question asked by user in 2 sentences.
    """
    prompt = f"""
    Answer the question asked by the user in 2 sentences, if its code based provide the code in python:
    {user_input}
    """
    # Call the Cohere API to generate text
    response = cohere_client.generate(
        model="command-xlarge-nightly", prompt=prompt, max_tokens=1500, temperature=0.7
    )

    # Extract and return the generated response text
    return response.generations[0].text


def main():
    # Get API key securely from environment variables
    load_dotenv()
    api_key = get_cohere_api_key()
    cohere_client = cohere.Client(api_key)

    # Get user input for folder paths
    user_question = input("Enter the question: ")
    output_text = extract_info(user_question, cohere_client)

    print(output_text)
if __name__ == "__main__":
    main()
# from flask import Flask, request, jsonify
# from dotenv import load_dotenv
# import os
# import cohere

# # Load environment variables
# load_dotenv()

# # Flask app initialization
# app = Flask(__name__)

# # Load Cohere API key
# def get_cohere_api_key():
#     api_key = os.getenv("COHERE_API_KEY")
#     if not api_key:
#         raise EnvironmentError("COHERE_API_KEY environment variable not set.")
#     return api_key

# # Initialize Cohere client
# api_key = get_cohere_api_key()
# cohere_client = cohere.Client(api_key)

# # API endpoint to process user input
# @app.route('/api/question', methods=['POST'])
# def handle_question():
#     try:
#         # Get user input from the request
#         user_input = request.json.get("user_input")
#         if not user_input:
#             return jsonify({"error": "No input provided"}), 400

#         # Generate output using Cohere
#         prompt = f"Answer the question asked by the user in 2 sentences:\n{user_input}"
#         response = cohere_client.generate(
#             model="command-xlarge-nightly",
#             prompt=prompt,
#             max_tokens=1500,
#             temperature=0.7
#         )

#         # Extract and return the generated response
#         output_text = response.generations[0].text.strip()
#         return jsonify({"output": output_text})

#     except Exception as e:
#         return jsonify({"error": str(e)}), 500

# if __name__ == "__main__":
#     app.run(debug=True, port=5000)
