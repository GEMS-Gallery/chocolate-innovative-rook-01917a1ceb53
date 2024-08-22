import Time "mo:base/Time";
import Int "mo:base/Int";
import Text "mo:base/Text";
import Nat "mo:base/Nat";

actor {
  stable var greeting : Text = "Hello world";
  stable var updateTime : Int = Time.now();
  var viewCount : Nat = 0;

  public query func getGreeting() : async Text {
    viewCount += 1;
    return greeting;
  };

  public func updateGreeting(newGreeting : Text) : async () {
    greeting := newGreeting;
    updateTime := Time.now();
  };

  public query func getMetadata() : async (Int, Nat) {
    return (updateTime, viewCount);
  };
}