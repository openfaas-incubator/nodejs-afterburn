package test_integration

import (
	"fmt"
	"io/ioutil"
	"os/exec"
	"testing"
)

func Test_NodeShortBody(t *testing.T) {
	t.Log("OK")

	cmd := exec.Command("node", "index.js")
	cmd.Dir = "../"
	writer, pipeErr := cmd.StdinPipe()
	if pipeErr != nil {
		t.Logf("Error %s", pipeErr.Error())
		t.Fail()
	}

	inputFile, inputErr := ioutil.ReadFile("../http_req.txt")

	if inputErr != nil {
		t.Logf("Error %s", inputErr.Error())
		t.Fail()
	}

	writer.Write(inputFile)
	writer.Close()
	outputBytes, err := cmd.CombinedOutput()
	if err != nil {
		t.Logf("Error %s", err.Error())
		t.Logf("%s", string(outputBytes))
		t.Fail()
	}

	fmt.Println(string(outputBytes))
}

func Test_NodeLongBody(t *testing.T) {
	t.Log("OK")

	cmd := exec.Command("node", "index.js")
	cmd.Dir = "../"
	writer, pipeErr := cmd.StdinPipe()
	if pipeErr != nil {
		t.Logf("Error %s", pipeErr.Error())
		t.Fail()
	}

	inputFile, inputErr := ioutil.ReadFile("../long")

	if inputErr != nil {
		t.Logf("Error %s", inputErr.Error())
		t.Fail()
	}

	writer.Write(inputFile)
	writer.Close()
	outputBytes, err := cmd.CombinedOutput()
	if err != nil {
		t.Logf("Error %s", err.Error())
		t.Logf("%s", string(outputBytes))
		t.Fail()
	}

	fmt.Println(string(outputBytes))
}
